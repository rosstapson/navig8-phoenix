import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Col, FloatingLabel, Form, Row, Dropdown } from 'react-bootstrap';
import {
    faBars,
    faEllipsis,
    faEnvelope,
    faThumbtack
} from '@fortawesome/free-solid-svg-icons';
import Dropzone from 'components/base/Dropzone';

const PaymentTerms = ({ className }: { className?: string }) => {
    return (
        <>
            <h4 className="mb-3">Payment Terms</h4>
            <Row className={classNames('g-3', className)}>
                <Col sm={6} md={4}>
                <FloatingLabel controlId="paymentTerms" label="Payment Terms">
                    <Form.Select>
                        <option value="30days">30 Days</option>
                        <option value="60days">60 Days</option>
                        <option value="90days">90 Days</option>
                        <option value="120days">120 Days</option>
                        <option value="upfront">Upfront Payment</option>
                        <option value="cod">COD - Payment on Delivery</option>
                    </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={6} md={4}>
                    <Dropzone multiple={false} onDrop={acceptedFiles => console.log(acceptedFiles)} />

                </Col>
            </Row>
        </>
    );
};

export default PaymentTerms;
