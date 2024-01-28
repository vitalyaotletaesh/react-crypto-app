import {createContext, useContext, useEffect, useState} from 'react'
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {percentDifferance} from "../utils.js";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

function mapAssets(assets, result) {
  return assets.map(asset => {
    const coin = result.find(c => c.id === asset.id)
    return {
      grow: asset.price < coin.price,
      growPercent: percentDifferance(asset.price, coin.price),
      totalAmount: coin.price * asset.amount,
      totalProfit: coin.price * asset.amount - asset.amount * asset.price,
      ...asset,
    }
  })
}

export function CryptoContextProvider({children}) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const {result} = await fakeFetchCrypto()
      const assets = await fetchAssets()

      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, []);

  function addAsset(newAsset) {
    setAssets(prev => mapAssets([...prev, newAsset], crypto))
  }

  return (
    <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}