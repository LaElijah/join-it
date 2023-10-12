import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div>
      <h2>Forgot Password</h2>
      <Link href="/auth/signin">
        <a>Sign in</a>
      </Link>
    </div>
  );
}
