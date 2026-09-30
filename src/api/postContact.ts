/**
 * Hasil postContact tidak pernah kita pakai;
 * kita hanya peduli sukses atau gagal.
 * unknown adalah cara jujur untuk bilang
 * 'saya tidak tahu dan tidak akan memakainya tanpa memeriksa dulu' */
export default async function postContact(
  name: string,
  email: string,
  message: string,
): Promise<unknown> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
