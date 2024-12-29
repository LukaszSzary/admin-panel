import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function CSRFInterceptor(req: HttpRequest<any>,next: HttpHandlerFn): Observable<HttpEvent<any>> {
  
  // Sprawdź, czy token istnieje i czy żądanie wymaga mutacji
  if (isMutatingRequest(req)) {
    
    const clonedRequest = req.clone({
      headers: req.headers.set('X-CSRF-TOKEN', 'CSRF-TOKEN')
    });

    // Przekazujemy zmodyfikowane żądanie dalej
    return next(clonedRequest);
  }

  // Jeśli nie ma tokena lub żądanie nie wymaga mutacji, przekazujemy żądanie bez zmian
  return next(req);
}

// Sprawdza, czy żądanie jest mutujące
function isMutatingRequest(req: HttpRequest<any>): boolean {
    return ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
}