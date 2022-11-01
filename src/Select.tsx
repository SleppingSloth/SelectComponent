import React, { useEffect, useRef, useState } from "react";
import clazz from "./select.module.css";
import { SelectOptions } from "./model";

type SelectProps = {
  options: SelectOptions[];
} & (MultipleSelectProps | SingelSelectProps);

type MultipleSelectProps = {
  multiple: true;
  value: SelectOptions[];
  onChange: (value: SelectOptions[]) => void;
};

type SingelSelectProps = {
  multiple?: false;
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptionHendler = () => {
    multiple ? onChange([]) : onChange(undefined);
  };
  const selecetOptionHendler = (option: SelectOptions) => {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
    };
    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={clazz.container}
      tabIndex={0}
    >
      <span className={clazz.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selecetOptionHendler(v);
                }}
                className={clazz.optionBadge}
              >
                {v.lable} <span className={clazz.clearBtn}>&times;</span>
              </button>
            ))
          : value?.lable}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptionHendler();
        }}
        className={clazz.clearBtn}
      >
        &times;
      </button>
      <div className={clazz.divider}></div>
      <div className={clazz.caret}></div>
      <ul className={`${clazz.options} ${isOpen ? clazz.show : ""}`}>
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selecetOptionHendler(option);
              setIsOpen(false);
            }}
            key={option.lable}
            className={clazz.option}
          >
            {option.lable}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
