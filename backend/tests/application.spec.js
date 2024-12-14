import { expect } from 'chai';
import sinon from 'sinon';
import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from '../controllers/application.controller.js';

describe('Job Application Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('applyJob', () => {
    it('should create a new application if the user has not applied before', async () => {
      const req = {
        id: '123456',
        params: { id: '789012' }
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      const mockJob = {
        _id: '789012',
        applications: [],
        save: sinon.stub().resolves()
      };

      sinon.stub(Application, 'findOne').resolves(null);
      sinon.stub(Job, 'findById').resolves(mockJob);
      sinon.stub(Application, 'create').resolves({ _id: '345678' });

      await applyJob(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'Job applied successfully.',
        success: true
      })).to.be.true;
    });

    it('should return an error if the user has already applied for the job', async () => {
      const req = {
        id: '123456',
        params: { id: '789012' }
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      sinon.stub(Application, 'findOne').resolves({ _id: '345678' });

      await applyJob(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'You have already applied for this jobs',
        success: false
      })).to.be.true;
    });

    it('should return an error if the job is not found', async () => {
      const req = {
        id: '123456',
        params: { id: '789012' }
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      sinon.stub(Application, 'findOne').resolves(null);
      sinon.stub(Job, 'findById').resolves(null);

      await applyJob(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'Job not found',
        success: false
      })).to.be.true;
    });
  });

  // describe('getAppliedJobs', () => {
  //   it('should return the applied jobs for a user', async () => {
  //     const req = {
  //       id: '123456'
  //     };
  //     const res = {
  //       status: sinon.stub().returns({
  //         json: sinon.stub()
  //       })
  //     };
  
  //     const mockApplications = [
  //       { _id: '111', job: '789012', applicant: '123456' },
  //       { _id: '222', job: '456789', applicant: '123456' }
  //     ];
  
  //     sinon.stub(Application, 'find').resolves(mockApplications);
  //     sinon.stub(Job, 'findById')
  //       .onFirstCall().resolves({ _id: '789012', company: { _id: '123' } })
  //       .onSecondCall().resolves({ _id: '456789', company: { _id: '456' } });
  
  //     await getAppliedJobs(req, res);
  
  //     expect(res.status.calledWith(200)).to.be.false;
  //     expect(res.status().json.calledWith({
  //       application: mockApplications,
  //       success: true
  //     })).to.be.false;
  //   });
  
  //   it('should return an error if no applications are found', async () => {
  //     const req = {
  //       id: '123456'
  //     };
  //     const res = {
  //       status: sinon.stub().returns({
  //         json: sinon.stub()
  //       })
  //     };
  
  //     sinon.stub(Application, 'find').resolves([]);
  
  //     await getAppliedJobs(req, res);
  
  //     expect(res.status.calledWith(404)).to.be.false;
  //     expect(res.status().json.calledWith({
  //       message: 'No Applications',
  //       success: false
  //     })).to.be.false;
  //   });
  // });
  // describe('getApplicants', () => {
  //   it('should return the applicants for a job', async () => {
  //     const req = {
  //       params: { id: '789012' }
  //     };
  //     const res = {
  //       status: sinon.stub().returns({
  //         json: sinon.stub()
  //       })
  //     };

  //     const mockJob = {
  //       _id: '789012',
  //       applications: ['111', '222', '333'],
  //       // populate: sinon.stub().resolves()
  //     };

  //     sinon.stub(Job, 'findById').resolves(mockJob);

  //     await getApplicants(req, res);

  //     expect(res.status.calledWith(200)).to.be.false;
  //     expect(res.status().json.calledWith({
  //       job: mockJob,
  //       success: true
  //     })).to.be.false;
  //   });

  //   it('should return an error if the job is not found', async () => {
  //     const req = {
  //       params: { id: '789012' }
  //     };
  //     const res = {
  //       status: sinon.stub().returns({
  //         json: sinon.stub()
  //       })
  //     };

  //     sinon.stub(Job, 'findById').resolves(null);

  //     await getApplicants(req, res);

  //     expect(res.status.calledWith(404)).to.be.false;
  //     expect(res.status().json.calledWith({
  //       message: 'Job not found.',
  //       success: false
  //     })).to.be.false;
  //   });
  // });

  describe('updateStatus', () => {
    it('should update the status of an application', async () => {
      const req = {
        body: { status: 'RESOLVED' },
        params: { id: '345678' }
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      const mockApplication = {
        _id: '345678',
        status: 'open',
        save: sinon.stub().resolves()
      };

      sinon.stub(Application, 'findOne').resolves(mockApplication);

      await updateStatus(req, res);

      expect(mockApplication.status).to.equal('resolved');
      expect(mockApplication.save.called).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'Status updated successfully.',
        success: true
      })).to.be.true;
    });

    it('should return an error if the status is not provided', async () => {
      const req = {
        body: {},
        params: { id: '345678' }
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      await updateStatus(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'status is required',
        success: false
      })).to.be.true;
    });

    it('should return an error if the application is not found', async () => {
      const req = {
        body: { status: 'RESOLVED' },
        params: { id: '345678' }
      };
      const res = {
        status: sinon.stub().returns({
          json: sinon.stub()
        })
      };

      sinon.stub(Application, 'findOne').resolves(null);

      await updateStatus(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.status().json.calledWith({
        message: 'Application not found.',
        success: false
      })).to.be.true;
    });
  });
});