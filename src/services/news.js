import request from '@/utils/request';
export async function queryNews(param) {
  return request('/api/notice/pageQuery',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};
export async function deleteNews(param) {
  return request('/api/notice/deleteById',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};
export async function saveOrUpdateNews(param) {
  return request('/api/notice/saveOrUpdate',{
    method:'post',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};
export async function changeStatus(param) {
  return request('/api/notice/changeStatus',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};