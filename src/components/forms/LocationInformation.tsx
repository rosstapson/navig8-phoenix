import classNames from 'classnames';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const LocationInformation = ({ 
  className, 
  onChange 
}: { 
  className?: string; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}) => {
  return (
    <>
      <h4 className="mb-3">Location Information</h4>
      <Row className={classNames('g-3', className)}>
        <Col sm={6} >
          <FloatingLabel controlId="searchLocation" label="Search Location">
            <Form.Control type="text" placeholder="Search Location" />
          </FloatingLabel>
        </Col>
        <Col sm={6}>

        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="addressLine1" label="Address Line 1">
            <Form.Control type="text" placeholder="Address Line 1" />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="addressLine2" label="Address Line 2">
            <Form.Control type="text" placeholder="Address Line 2" />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="addressLine3" label="Address Line 3">
            <Form.Control type="text" placeholder="Address Line 3" />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="addressLine4" label="Address Line 4">
            <Form.Control type="text" placeholder="Address Line 4" />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="addressLine5" label="Address Line 5">
            <Form.Control type="text" placeholder="Address Line 5" />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="addressLine6" label="Address Line 6">
            <Form.Control type="text" placeholder="Address Line 6" />
          </FloatingLabel>
        </Col>
      </Row>
    </>
  );
};

export default LocationInformation;
