export function useUser() {
    const user = useState("user", () => '');
    return {
      user
    };
  }