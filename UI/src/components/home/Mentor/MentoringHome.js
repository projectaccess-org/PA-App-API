import React from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import * as _ from 'lodash';
import MenteeTile from './MenteeTile';
import AcceptMenteeBox from './AcceptMenteeBox';
import CountryPartner from '../../advertising/CountryPartner';
import { Icon } from 'react-fa';
import ReferAFriend from '../../various/ReferAFriend';


const MentoringHome = (props) => {

  let toRender;
  if (!props.user.onboarded) {
    toRender = <Button onClick={() => props.history.push('/onboard')}>
      Looks like you are not onboarded, go finish
    </Button>;
  } else if (props.user.mentorProfile.status === 'rejected') { //TODO
    toRender = <div>
      Unfortunately you have been rejected, and this was indicated as the reason:
      <blockquote>
        {props.user.mentorProfile.rejectionReason}
      </blockquote>
    </div>;
  }

  return (
    <div>
      <Row>
        <Col md={9}>
          <p>
            It's always great to see you back with us, and thank you so much for being an amazing human being changing
            the world!
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={9}>
          HOME
        </Col>
        <Col md={3}>
          <Row>
            <h4>Your Mentees <span role="img" aria-labelledby={'angel emoji'}>😇</span></h4>
            {_.get(props, 'user.mentorProfile.relationship.length') > 0 ?
              props.user.mentorProfile.relationship.sort((a, b) => a.status === 'awaitingConfirmation' ? -1 : 1).map(r => r.status === 'awaitingConfirmation' ?
                <AcceptMenteeBox {...r} /> : <MenteeTile key={r._id} {...r} />) :
              <div>
                <div>{toRender}</div>
              </div>}
          </Row>
          <br/>
          <Row>
            <ReferAFriend mentorMode/>
          </Row>
          <br/>
          <Row>
            <CountryPartner country={props.user.mentorProfile.country}
                            index={props.user._id.toLowerCase().split('').reduce((result, ch) =>
                              result * 16 + '0123456789abcdefgh'.indexOf(ch), 0) % 4}/>
          </Row>

        </Col>
      </Row>
    </div>
  );
};

export default MentoringHome;
