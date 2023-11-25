import { useState } from "react";

import { Drawer, Modal } from "./components";

function App() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div style={{ display: "flex", gap: 20 }}>
        <button type="button" onClick={() => setIsOpenDrawer(!isOpenDrawer)}>
          Trigger Drawer
        </button>
        <button onClick={() => setIsOpenModal(!isOpenModal)}>
          Trigger Modal
        </button>
      </div>
      <Drawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <>
          <button onClick={() => setIsOpenDrawer(false)}>Close</button>
          <p>The drawer content!</p>
        </>
      </Drawer>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <>
          <button type="button" onClick={() => setIsOpenModal(false)}>
            Close
          </button>
          <p>The modal content!</p>
        </>
      </Modal>
    </>
  );
}

export default App;
