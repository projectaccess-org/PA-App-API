import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../various/ProfileIcon";
import moment from "moment";
import ConfirmAcceptMentee from "../home/Mentor/ConfirmAcceptMentee";
import connect from "react-redux/es/connect/connect";
import { mentorDecisionRelationship, toggleMentorConfirmDecision } from "../../actions/actionCreator";

const MenteeTile = (props) => {
  const timeLeft = moment.duration(new moment(props.matchedOn).add(5, "d").diff(new moment()));
  const days = Math.floor(timeLeft.asDays());
  const hours = Math.floor(timeLeft.subtract(days, "d").asHours());

  const ConfirmAcceptMenteeButton = connect(({ mentorHome }) => {
    return { mentorHome, relationshipId:  props._id };
  }, dispatch => {
    return {
      toggleMentorConfirmDecision: (showConfirmDecision) => dispatch(toggleMentorConfirmDecision(showConfirmDecision)),
      mentorDecisionRelationship: (accept) => dispatch(mentorDecisionRelationship(props._id, accept))
    };
  })(ConfirmAcceptMentee);


  return (
    <Container style={{ marginBottom: "10px" }}>
      <Row>
        <Col md={4}>
          <ProfileIcon pictureUrl={props.mentee.pictureUrl} size={"l"} mentorMode/>
        </Col>
        <Col md={6}>
          <Row>
            <h6>
              {props.mentee.firstName}
            </h6>
          </Row>
        </Col>
      </Row>
      <br/>
      {props.status === "awaitingConfirmation" ? <div>
          <Row>
            <Col>
              <p>{`Fantastic, you have been matched to help ${props.mentee.firstName}! You have ${days} day${days === 1 ? "" : "s"} and ${hours} hour${hours === 1 ? "" : "s"} left to confirm before
              we will have to match them with another mentor`}</p>
            </Col>
          </Row>
          {(moment.duration(new moment(props.matchedOn).add(5, "d").diff(new moment())) <= 0) ? "Time ran out to confirm, sorry" : <ConfirmAcceptMenteeButton/>}
        </div> :
        <Row>
          <Col>
            <LinkContainer to="/message">
              <Button block><Icon name="fas fa-commenting"/> Message</Button>
            </LinkContainer>
          </Col>
          <Col>
            <LinkContainer to="/call">
              <Button block><Icon name="fas fa-phone"/> Call</Button>
            </LinkContainer>
          </Col>
        </Row>}
    </Container>
  );
};

export default MenteeTile;
