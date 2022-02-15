export function useShopCar() {
    const shopList = useState("shopList", () => []);
    const shopListState =useState('shopListState', () => [])
    return {
        shopList,
        shopListState
    };
  }
  