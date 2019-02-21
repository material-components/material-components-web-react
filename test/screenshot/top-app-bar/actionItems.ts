export interface actionItem {
  icon: string;
  label: string;
}

const actionItems: actionItem[] = [
  {icon: 'file_download', label: 'Download'},
  {icon: 'print', label: 'Print this page'},
  {icon: 'bookmark', label: 'Add to bookmarks'},
];

export {actionItems};
