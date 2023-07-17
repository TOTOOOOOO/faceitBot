const axios = require("axios");
const dotenv = require("dotenv").config();

const ft = process.env.FACEIT_TOKEN;

async function idStatsCheck(x) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("https://open.faceit.com/data/v4/players/" + x, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + ft,
          },
        })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject("error");
          console.log(error);
        });
    } catch (err) {
      return "error";
    }
  });
}


async function idStats(x) {
    return new Promise((resolve, reject) => {
      try {
        axios.get("https://open.faceit.com/data/v4/players/" + x + "/stats/csgo", {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer ' + ft
            }
          })
          .then(function (response) {
            resolve(response.data)
          })
          .catch(function (error) {
            reject("error")
            console.log(error);
          })
      } catch (err) {
        return "error"
      }
    })
}

async function nickStats(x) {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(
          "https://open.faceit.com/data/v4/players?nickname=" +
            encodeURIComponent(x),
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + ft,
            },
          }
        )
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject("error");
          console.log(error);
        });
    } catch (err) {
      return "error";
    }
  });
}


module.exports = {
  idStatsCheck,
  idStats,
  nickStats,
}