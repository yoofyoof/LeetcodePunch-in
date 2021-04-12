import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as loginToken from "../Components/loginTokenAndSignOff";
import Navbar from "../Components/Navbar/Navbar";
import "./HomePage.css";
// eslint-disable-next-line no-unused-vars
import Modal from "react-modal";
import Calendar from "./components/Calendar.js";

function HomePage() {
  const history = useHistory();

  const [posts, setPost] = useState("");
  const [ranks, setRank] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [rankDataStatus, setRankDataStatus] = useState(false);
  const [qidinfo, setQidinfo] = useState("");
  const getInfo = async () => {
    const res = await fetch("/get_data", { method: "GET" });
    const data = await res.json();
    setPost(data);
    setDataStatus(true);
  };

  const getRankInfo = async () => {
    const res = await fetch("/get_rank_data", { method: "GET" });
    const data = await res.json();
    setRank(data);
    setRankDataStatus(true);
  };

  const searchByQid = async () => {
    const res = await fetch("/get_data_query", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: qidinfo }),
    });
    const data = await res.json();

    setPost(data);
    return data;
  };

  const handleQidInputChange = (event) => {
    setQidinfo(event.target.value);
  };

  useEffect(() => {
    getInfo();
    getRankInfo();
  }, []);

  //check database if the user is in the currently login collection
  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, []);

  const check = async () => {
    const data = localStorage.getItem("current-user");

    if (data) {
      const result = await loginToken.checkCurrentLogin({ email: data });

      if (result.result === false) {
        history.push("/signin");
      }
    } else {
      history.push("/signin");
    }
  };

  const handleLogOut = async () => {
    const data = localStorage.getItem("current-user");
    await loginToken.deleteLoginToken({ email: data });
    await localStorage.removeItem("current-user");
  };

  return (
    <div className="searchpost-page-body">
      <Navbar logoutFunction={handleLogOut} />
      <div className="calendar">
        <Calendar post={posts} onChange={getInfo} onRankChange={getRankInfo} />
      </div>
      <Container className="timeline">
        <div className="searchpost-filter-area">
          <input
            aria-label="search-field-zipcode"
            className="searpost-input-qid"
            type="number"
            placeholder="Search By Question ID"
            onChange={handleQidInputChange}
          />

          <button className="btn-search" onClick={searchByQid}>
            Seach
          </button>
          <button className="btn-reset" onClick={getInfo}>
            Reset
          </button>
        </div>

        <div className="row">
          {dataStatus ? (
            <div className="grid col-sm">
              {posts.map((t) => (
                <div>
                  {t.username} completed problem {t.title} in {t.date}.
                </div>
              ))}
            </div>
          ) : (
            <h1>Loading</h1>
          )}

          {rankDataStatus ? (
            <div className="grid col-sm">
              {ranks.map((t) => (
                <div>
                  {t.username} completed {t.qCount} in total!
                </div>
              ))}
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
