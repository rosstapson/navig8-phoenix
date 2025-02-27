import classNames from 'classnames';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const CompanyInformation = ({ 
  className, 
  onChange 
}: { 
  className?: string; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
}) => {
  return (
    <>
      <h4 className="mb-3">Contact Information</h4>
      <Row className={classNames('g-3', className)}>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="first-name" label="Company Name">
            <Form.Control type="text" placeholder="Company Name" name="companyName" onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="last-name" label="VAT Number">
            <Form.Control type="text" placeholder="VAT Number" name="vatNumber"  onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="last-name" label="Registration Number">
            <Form.Control type="text" placeholder="Registration Number" name="registrationNumber"  onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="website" label="Website">
            <Form.Control  onChange={onChange}  type="text" name="websiteURL" placeholder="Website" />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="phone-number" label="Phone Number">
            <Form.Control type="text" placeholder="Phone Number" name="phoneNumber"  onChange={onChange}  />
          </FloatingLabel>
        </Col>
      </Row>
      
      <h4 className="mb-3">Contact Person</h4>
      <Row className={classNames('g-3', className)}>
      <Col sm={6} md={4}>
          <FloatingLabel controlId="title" label="Contact Person Title">
            <Form.Control type="text" placeholder="Contact Person Title"  onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="first-name" label="Contact Person First name">
            <Form.Control type="text" placeholder="Contact Person First name"  onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="last-name" label="Contact Person Last name">
            <Form.Control type="text" placeholder="Contact Person Last name"  onChange={onChange} />
          </FloatingLabel>
        </Col>

        
        
        <Col sm={6} md={4}>
          <FloatingLabel
            controlId="position"
            label="Position"
          >
            <Form.Control type="text" placeholder="Position"  onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="email" label="Email">
            <Form.Control type="email" placeholder="Email"  onChange={onChange} />
          </FloatingLabel>
        </Col>
        <Col sm={6} md={4}>
          <FloatingLabel controlId="phone" label="Phone">
            <Form.Control
              type="number"
              placeholder="Phone"
              className="input-spin-none"
              onChange={onChange} 
            />
          </FloatingLabel>
        </Col>
      </Row>
      
    </>
  );
};

export default CompanyInformation;
