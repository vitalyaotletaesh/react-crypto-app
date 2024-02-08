import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useCrypto} from "../../context/crypto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: '60px',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false);
  const {crypto} = useCrypto()

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect(prev => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, []);

  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find(c => c.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: '450px',
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value='Press / to open'
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{width: '20px'}} src={option.data.icon} alt={option.data.label}/> {option.data.label}
          </Space>
        )}
      />

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}/>
      </Modal>

      <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>

      <Drawer destroyOnClose width={600} title={'Add asset'} onClose={() => setDrawer(false)} open={drawer}>
        <AddAssetForm onClose={() => setDrawer(false)}/>
      </Drawer>
    </Layout.Header>
  )
}