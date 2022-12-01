type Props = {
  children: React.ReactNode
  onClose: () => void
}

export const Modal =({ children, onClose }: Props) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog
        className="modal"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
