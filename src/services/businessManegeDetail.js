import request from '@/utils/request';
export async function findBusinessDetailsById(param) {
  return request('/api/busines/findBusinessDetailsById',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};