export function useGetmember() {
    const member = useState("member", () => {});
    return {
        member
    };
  }
  