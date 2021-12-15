import renderHTML from "react-render-html";

export default function AnswerPanel({ data }) {
  return (
    <div className="answer-panel r-container py-5">
      <h1 className="title text-capitalize blue-text text-center py-md-5 my-5">{renderHTML(data.title)}</h1>
      <div className="row answers-box mb-md-5 pb-md-5">
        {
          data.answers.map((item, index) => {
            return (
              <div className="col-md-4 mb-4 mb-md-0" key={index}>
                <div className="answer-box round p-4">
                  <h3 className="blue-text">{item.title}</h3>
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
