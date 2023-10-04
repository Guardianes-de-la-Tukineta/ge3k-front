import { useAuth0 } from "@auth0/auth0-react";

export default function Logout() {
  const { logout } = useAuth0();

  return <button style={{borderRadius:'10px', padding:'5px 8px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}}  onClick={() => logout()}> LogOut </button>;
}
