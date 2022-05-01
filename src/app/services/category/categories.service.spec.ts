import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
import { CategoriesService } from './categories.service';


describe('CategoriesService', () => {
  let service: CategoriesService;
  let url = `${environment.SERVICE_BASEPATH}/categoria`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService]
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should get category',
    inject(
      [HttpTestingController, CategoriesService],
      (httpMock: HttpTestingController) => {
        const mockEntry: Category = {
          id: 'id',
          name: 'name'
        }

        service.getCategory('id').subscribe(
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

  it('should get categories',
    inject(
      [HttpTestingController, CategoriesService],
      (httpMock: HttpTestingController) => {
        const mockEntry: Category[] = [
          { id: '1', name: 'name' },
          { id: '2', name: 'name' },
          { id: '3', name: 'name' },
        ]

        service.getCategories().subscribe(
          res => expect(res).toEqual(mockEntry)
        );

        const mockReq = httpMock.expectOne(`${url}`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockEntry);

        httpMock.verify();
      }
    )
  );

  it('should create category',
    inject(
      [HttpTestingController, CategoriesService],
      (httpMock: HttpTestingController) => {
        const mockEntry: Category = {
          id: 'id',
          name: 'name'
        }

        service.createCategory('name').subscribe(
          res => expect(res).toEqual(mockEntry)
        );

        const mockReq = httpMock.expectOne(`${url}`);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockEntry);

        httpMock.verify();
      }
    )
  );

  it('should create category',
  inject(
    [HttpTestingController, CategoriesService],
    (httpMock: HttpTestingController) => {
      service.deleteCategory('id').subscribe(
        res => expect(res).toBeNull()
      );

      const mockReq = httpMock.expectOne(`${url}/id`);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      httpMock.verify();
    }
  )
);

});
