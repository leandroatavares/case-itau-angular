import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Entry } from '../models/Entry';
import { EntriesService } from './entries.service';


describe('EntriesService', () => {
  let service: EntriesService;
  let url = `${environment.SERVICE_BASEPATH}/lancamento`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntriesService]
    });
    service = TestBed.inject(EntriesService);
  });

  it('should get entry',
    inject(
      [HttpTestingController, EntriesService],
      (httpMock: HttpTestingController) => {
        const mockEntry: Entry = {
          id: 'id',
          idCategoria: 'idCategoria',
          description: 'description',
          date: 'date',
          value: 123
        }

        service.getEntry('id').subscribe(
          res => expect(res).toEqual(mockEntry)
        );

        const mockReq = httpMock.expectOne(`${url}/id`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockEntry);

        httpMock.verify();
      }
    )
  );
});
