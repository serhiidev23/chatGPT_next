const WritingButton = ({handleClick, btnName}) => {
  return (
    <label onClick={handleClick} className="ml-6 btn normal-case bg-white w-20 h-12 cursor-pointer rounded-lg border border-neutral-300 justify-center items-center gap-2.5 inline-flex">
      {btnName}
    </label>
  );
};

export default WritingButton;
