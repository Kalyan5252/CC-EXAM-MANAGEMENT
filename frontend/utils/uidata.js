const parseExamDate = (dt) => {
  const date = new Date(dt).getDate();
  const month = new Date(dt).getMonth();
  const year = new Date(dt).getFullYear();
  return `${String(date).padStart(2, '0')}/${String(month).padStart(
    2,
    '0'
  )}/${year}`;
};

const gridRegistration = (props) => (
  <div className="flex items-center gap-2">
    <p>{props.Name}</p>
  </div>
);
const gridDate = (props) => <p>{parseExamDate(props.examDate)}</p>;

export const employeesGrid = [
  { field: 'title', headerText: 'Exam', width: '150', textAlign: 'Center' },
  {
    // field: 'examDate',
    headerText: 'Date of Exam',
    width: '170',
    template: gridDate,
    textAlign: 'Center',
  },
  // {
  //   headerText: 'Country',
  //   width: '120',
  //   textAlign: 'Center',
  //   template: gridEmployeeCountry,
  // },
];
