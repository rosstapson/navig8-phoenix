import Button from 'components/base/Button';
import AvatarUpload from 'components/common/AvatarUpload';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from 'data/commonData';
import avatar from 'assets/img/team/150x150/58.webp';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import CompanyInformation from 'components/forms/CompanyInformation';
import LocationInformation from 'components/forms/LocationInformation';
import PaymentTerms from 'components/forms/PaymentTerms';
import { useStore } from 'stores/store';
import { FormEvent, useState } from 'react';
import usePhoenixForm from 'hooks/usePhoenixForm';
import { Company } from 'data/company';
import axios from 'axios';
import agent from '../../../api/agent'

const AddClient = () => {

  const initialFormData = {}

  const { Companies } = agent;

  const { formData, setFormData, onChange } = usePhoenixForm<Company>(initialFormData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // calendarDispatch({
    //   type: ADD_NEW_EVENT,
    //   payload: formData
    // });
    
    Companies.create(formData).then(zomg => {
      console.log(zomg)
    })
  };


  return (
    <div className="mb-9">
      <PageBreadcrumb items={defaultBreadcrumbItems} />
      <div className="border-bottom border-translucent mb-7 mx-n3 px-2 mx-lg-n6 px-lg-6">
        <Row>
          <Col xl={9}>
            <div className="d-sm-flex justify-content-between">
              <h2 className="mb-4">Create a new client</h2>
              <div className="d-flex mb-3">
                <Button variant="phoenix-primary" className="me-2 px-6">
                  Cancel
                </Button>
                <Button variant="primary">Create client</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col xl={9}>
          <div className="d-flex align-items-end position-relative mb-7">
            <AvatarUpload src={avatar} size="5xl" />
          </div>
          <Form onSubmit={handleSubmit} >
            <CompanyInformation onChange={onChange} className="mb-6" />
            <LocationInformation className="mb-6" />
            <PaymentTerms className='mb-6' />
            
            <div className="text-end">
              <Button type='submit' variant="primary" className="mt-6">
                Create client
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddClient;
