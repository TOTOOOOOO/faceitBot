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


async function cs2Stats(x) {
    return new Promise((resolve, reject) => {
      try {
        axios.get("https://open.faceit.com/data/v4/players/" + x + "/stats/cs2", {
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

async function getMatchHistory(playerId, limit = 5) {
    return new Promise((resolve, reject) => {
        try {
            axios.get(`https://open.faceit.com/data/v4/players/${playerId}/history?game=cs2&offset=0&limit=${limit}`, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + ft
                }
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

async function getMatchDetails(matchId) {
    return new Promise((resolve, reject) => {
        try {
            axios.get(`https://open.faceit.com/data/v4/matches/${matchId}/stats`, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + ft
                }
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
module.exports = {
  idStatsCheck,
  cs2Stats,
  nickStats,
  getMatchHistory,
  getMatchDetails,
}