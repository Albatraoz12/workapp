export const deleteItem = async (id: any) => {
  console.log(id);
  const res = await fetch(`api/items/deleteItem/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application-json",
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
};
