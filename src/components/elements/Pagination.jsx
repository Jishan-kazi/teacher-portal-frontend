import axios from "axios";

export default function pagination({
  links,
  currentPage,
  lastPage,
  assignStudentData,
  handleError
}) {
  let from = currentPage - 1;
  let to = currentPage + 1;

  if (currentPage === 1 || from < 1) {
    from = 1;
  }

  if (currentPage === lastPage || to > lastPage) {
    to = lastPage;
  }

  function makeLabel(label) {
    if (label.includes("Previous")) {
      return "Previous";
    } else if (label.includes("Next")) {
      return "Next";
    } else {
      return label;
    }
  }

  async function getPaginationData(url) {
    if (!url) {
      return;
    }
    try {
      const res = await axios.get(url);
      assignStudentData(res);
    } catch (err) {
      handleError("Oops! Unable to fetch data");
    }
  }

  return (
    <>
      {links.length > 3 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {links.map((element, i) => {
                if ((from > 2 && i === 2) || (to < links.length-3 && i === links.length-3)) {
                  return <li>.....</li>;
                }

              if ((i >= from && i <= to) || i <=1  || i >= links.length-2) {
                return (
                  <li className="page-item">
                    <button
                      onClick={() => getPaginationData(element.url)}
                      type="button"
                      className={`page-link ${element.active ? 'bg-info-subtle' : ''}`}
                    >
                      {makeLabel(element.label)}
                    </button>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      )}
    </>
  );
}
