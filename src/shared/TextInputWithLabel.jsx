function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  classNameText,
  classNameInput
}) {
  return (
    //add sanitation
    <>
      <label className={classNameText} htmlFor={elementId}>{labelText}</label>
      <input
        className={classNameInput}
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
