import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSpecialConditionsList } from "../../../../../redux/CustomerOrdersSlice";

const validateCondition = (raw) => {
  const sql = (raw || "")?.trim();
  if (!sql) return { valid: false, message: "Nothing to validate." };

  // Single pass: track string literals and parenthesis depth.
  let depth = 0;
  let inString = false;
  for (let i = 0; i < sql?.length; i++) {
    const ch = sql[i];
    if (inString) {
      if (ch === "'") {
        // '' inside a string literal is an escaped single quote.
        if (sql[i + 1] === "'") i++;
        else inString = false;
      }
      continue;
    }
    if (ch === "'") inString = true;
    else if (ch === "(") depth++;
    else if (ch === ")") {
      depth--;
      if (depth < 0) return { valid: false, message: "Unbalanced parentheses: unexpected ')'." };
    }
  }
  if (inString) return { valid: false, message: "Unterminated string literal — check the quotes." };
  if (depth !== 0) return { valid: false, message: "Unbalanced parentheses." };

  // Remove string literals so operator/keyword checks ignore their contents.
  const stripped = sql?.replace(/'(?:''|[^'])*'/g, "''");

  if (/\(\s*\)/.test(stripped)) return { valid: false, message: "Empty parentheses '()' are not allowed." };

  if (/^\s*(AND|OR|NOT)\b/i.test(stripped))
    return { valid: false, message: "Condition cannot start with a logical operator." };
  if (/\b(AND|OR|NOT)\s*$/i.test(stripped))
    return { valid: false, message: "Condition cannot end with a logical operator." };
  if (/(<=|>=|<>|!=|=|<|>)\s*$/.test(stripped))
    return { valid: false, message: "Condition cannot end with a comparison operator." };

  const hasComparison = /(<=|>=|<>|!=|=|<|>)/.test(stripped) || /\b(LIKE|IN|BETWEEN|IS)\b/i.test(stripped);
  if (!hasComparison)
    return { valid: false, message: "Condition must contain a comparison (e.g. =, <>, LIKE, IN, IS)." };

  return { valid: true, message: "Condition is valid." };
};

const Conditions = () => {
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.customerOrdersReducer.viewDetail);
  const conditions = useSelector((state) => state.customerOrdersReducer.specialConditionsList);
  const addConditionTrigger = useSelector((state) => state.customerOrdersReducer.addConditionTrigger);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [modalText, setModalText] = useState("");
  const [editable, setEditable] = useState(false);

  const [isValidated, setIsValidated] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);
  const modalTextareaRef = useRef(null);
  const getModalText = () => modalTextareaRef.current?.value ?? modalText;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const openCreate = (index) => {
    setModalMode("create");
    setTargetIndex(index);
    setModalText("");
    setEditable(true);
    setIsValidated(false);
    setShowModal(true);
  };

  // Track the last-seen trigger so a persisted value doesn't re-open on remount.
  const lastTriggerRef = useRef(addConditionTrigger);
  useEffect(() => {
    if (addConditionTrigger !== lastTriggerRef.current) {
      lastTriggerRef.current = addConditionTrigger;
      openCreate(conditions?.length);
    }
  }, [addConditionTrigger]);

  const openView = (index) => {
    setModalMode("view");
    setTargetIndex(index);
    setModalText(conditions[index] || "");
    setEditable(false);
    setIsValidated(false);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleValidate = () => {
    const text = getModalText();
    setModalText(text);
    const { valid, message } = validateCondition(text);
    setIsValidated(valid);
    if (valid) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleModalSave = () => {
    const text = getModalText();
    if (!text?.trim()) {
      toast.error("Condition cannot be empty.");
      return;
    }
    if (modalMode === "create") {
      const next = [...conditions];
      next.splice(targetIndex, 0, text);
      dispatch(setSpecialConditionsList(next));
    } else {
      dispatch(setSpecialConditionsList(conditions?.map((c, i) => (i === targetIndex ? text : c))));
    }
    setShowModal(false);
  };

  const openDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    dispatch(setSpecialConditionsList(conditions?.filter((_, i) => i !== deleteIndex)));
    closeDeleteModal();
  };

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="p-3 w-100 m-l-15">
          <div style={{ maxHeight: "380px", overflowY: "auto" }}>
            {conditions?.map((condition, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <textarea
                  readOnly
                  rows={4}
                  className="form-control flex-grow-1 me-2"
                  style={{
                    resize: "none",
                    height: "50px",
                    maxWidth: "420px",
                    ...(/[\r\n]/.test(condition || "")
                      ? { paddingTop: "0px" }
                      : { display: "flex", alignItems: "center", paddingTop: "2px" }),
                  }}
                  value={condition}
                  title={condition}
                />

                <button
                  type="button"
                  className="btn btn-secondary btn-sm flex-shrink-0 me-2"
                  onClick={() => openView(index)}
                >
                  View
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm flex-shrink-0"
                  onClick={() => openDelete(index)}
                  disabled={viewDetail}
                  title="Delete condition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "create" ? "Add Condition" : "Condition"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            ref={modalTextareaRef}
            rows={24}
            className="form-control"
            style={{ fontFamily: "monospace", minHeight: "420px" }}
            value={modalText}
            readOnly={!editable}
            onChange={(e) => {
              setModalText(e.target.value);
              setIsValidated(false);
            }}
            placeholder="Enter SQL condition…"
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setEditable(true)}
            disabled={editable || viewDetail}
          >
            Edit
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleValidate}>
            Validate
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleModalSave}
            disabled={!editable || viewDetail || !isValidated}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this condition?</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button type="button" className="btn btn-secondary btn-sm" onClick={closeDeleteModal}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={handleConfirmDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Conditions;
