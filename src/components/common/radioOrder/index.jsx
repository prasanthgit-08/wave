import React, { useEffect, useState } from "react";
// import './index.css'

const RadioOrder = ({
  sections,
  levels,
  fieldNames,
  setFilterData,
  filterData,
  fetchData,
  modalClosingRef,
}) => {
  // props example

  //   sections= [
  //     { label: "Name", value: "name" },
  //     { label: "City", value: "city" },
  //     { label: "State", value: "stateCode" },
  //   ]
  //   levels= ["1st", "2nd", "3rd"]
  //   fieldNames= ["firstField", "secondField", "thirdField", "fourthField", "fifthField"],

  const [selected, setSelected] = useState(
    sections?.reduce((acc, s) => {
      acc[s.value] = null;
      return acc;
    }, {})
  );

  const [visibleLevel, setVisibleLevel] = useState(1);

  const getTransformedResult = (selected) => {
    const result = {};
    fieldNames?.forEach((f) => (result[f] = null));

    Object.entries(selected)?.forEach(([section, level]) => {
      if (level) {
        const index = levels?.indexOf(level);
        if (index !== -1) {
          result[fieldNames[index]] = section;
        }
      }
    });

    return result;
  };

  const getColumnOwner = (level) => {
    const entry = Object.entries(selected)?.find(([, val]) => val === level);
    return entry ? entry[0] : null;
  };

  const handleClick = (sectionValue, level) => {
    const levelIndex = levels?.indexOf(level);

    setSelected((prev) => {
      const next = { ...prev };
      const currentValue = prev[sectionValue];

      if (currentValue === level) {
        next[sectionValue] = null;
        return next;
      }

      next[sectionValue] = level;

      if (levelIndex + 2 > visibleLevel) {
        setVisibleLevel(levelIndex + 2);
      }

      return next;
    });
  };

  const handleUncheckAndCollapse = (sectionValue, level) => {
    const levelIndex = levels?.indexOf(level);

    setSelected((prev) => {
      const next = { ...prev };

      next[sectionValue] = null;

      levels?.slice(levelIndex + 1, visibleLevel).forEach((lvl) => {
        Object.keys(next).forEach((s) => {
          if (next[s] === lvl) next[s] = null;
        });
      });

      setVisibleLevel(levelIndex + 1);

      return next;
    });
  };

  const highestCheckedIndex = Math.max(
    ...Object.values(selected).map((val) => (val ? levels?.indexOf(val) : -1))
  );

  useEffect(() => {
    const result = getTransformedResult(selected);
    setFilterData({ ...filterData, advanceSortingOrder: result });
  }, [selected]);

  useEffect(() => {
    // cleanup on unmount
    modalClosingRef.current = false;
    return () => {
      setFilterData({ ...filterData, advanceSortingOrder: null });

      setTimeout(() => {
        if (!modalClosingRef.current) {
          fetchData();
        }
      }, 0);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ width: 80 }} />
      </div>

      {sections?.map((section) => (
        <div key={section.value} style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
          <div>
            <div style={{ width: 80, fontWeight: 300 }}>{section.label}</div>

            {levels?.slice(0, visibleLevel).map((level, idx) => {
              const checked = selected[section.value] === level;
              const owner = getColumnOwner(level);

              const columnTaken = owner && owner !== section.value;
              const rowTaken = selected[section.value] && selected[section.value] !== level;
              const lowerLocked = highestCheckedIndex > idx && idx < visibleLevel - 1;
              const disabled = columnTaken || rowTaken || lowerLocked;

              return (
                <label
                  key={level}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginRight: 16,
                    gap: 5,
                    opacity: disabled ? 0.6 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name={section.value}
                    checked={checked}
                    //   disabled={disabled}
                    onClick={() => {
                      if (disabled) return;
                      if (checked) {
                        if (idx + 1 === visibleLevel) {
                          handleClick(section.value, level);
                        } else {
                          handleUncheckAndCollapse(section.value, level);
                        }
                      } else {
                        handleClick(section.value, level);
                      }
                    }}
                    readOnly
                  />
                  {level}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioOrder;
