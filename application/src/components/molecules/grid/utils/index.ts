function activeButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.currentTarget.classList.add("focused");
}

function desactiveButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.currentTarget.classList.remove("focused");
}

export { activeButton, desactiveButton };
