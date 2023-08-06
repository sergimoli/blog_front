export const Petition = async (
  url,
  method,
  dataToBeSaved = "",
  files = false
) => {
  let charging = true;

  let options = {
    method: "GET",
  };

  if (method === "GET" || method === "DELETE") {
    options = {
      method: method,
    };
  }

  if (method === "POST" || method === "PUT") {
    if (files) {
      options = {
        method: method,
        body: dataToBeSaved,
      };
    } else {
      options = {
        method: method,
        body: JSON.stringify(dataToBeSaved),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  }

  const petition = await fetch(url, options);
  const info = await petition.json();

  charging = false;
  //retornem la petició ajax(info) i carregant.
  return {
    info,
    charging,
  };
};
