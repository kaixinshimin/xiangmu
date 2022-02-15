export function getEmail() {
    const emails = useState("emails", () => '');
    return {
        emails
    };
  }
  