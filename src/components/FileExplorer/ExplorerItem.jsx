import { useState } from "react";
import FolderIcon from "../../assets/folder.png";
import openFolder from "../../assets/open-folder.png";

export const ExplorerItem = (props) => {
  const { item, updateData } = props;
  const [isOpen, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [addingFileOrFolder, setAddingFileOrFolder] = useState("");

  const addNewHandler = (e, typeOfNewItem) => {
    e.stopPropagation();

    setOpen(true);
    setShowInput(true);
    setAddingFileOrFolder(typeOfNewItem);
  };

  const inputKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      const newItem = {
        id: "323",
        name: e.target.value,
        isFolder: addingFileOrFolder === "folder",
        items: [],
      };

      updateData(item.id, newItem);
      setShowInput(false);
    }
  };

  if (!item.isFolder) {
    return <div style={{ marginBottom: "0.5rem" }}>{item.name}</div>;
  }

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
          gap: "0.5rem",
        }}
        onClick={() => setOpen((open) => !open)}
      >
        <img
          src={isOpen ? openFolder : FolderIcon}
          height="15"
          width="15"
          alt=""
        />
        <span>{item.name}</span>
        <button onClick={(e) => addNewHandler(e, "file")}>File +</button>
        <button onClick={(e) => addNewHandler(e, "folder")}>Folder +</button>
      </div>

      <div
        style={{ display: isOpen ? "block" : "none", paddingLeft: "2.5rem" }}
      >
        {item.items.map((item) => (
          <ExplorerItem key={item.name} item={item} />
        ))}

        {showInput && (
          <input
            type="text"
            autoFocus
            style={{ marginBottom: "1rem" }}
            onKeyDown={inputKeyDownHandler}
            onBlur={() => setShowInput(false)}
          />
        )}
      </div>
    </>
  );
};