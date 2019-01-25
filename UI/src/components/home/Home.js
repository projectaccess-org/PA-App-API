import React from "react";
import MentorHome from "./MentorHome";
import MenteeHome from "./MenteeHome";
import { Redirect } from "react-router-dom";

const Home = (props) => {
    if(!props.user) return <Redirect to={'/onboard'} />;
    else return props.user.type === "mentor" ? <MentorHome {...props} /> : <MenteeHome {...props} />
};

export default Home;
