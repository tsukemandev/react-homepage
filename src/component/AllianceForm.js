import { useEffect } from "react";

function AllianceForm() {

  useEffect(() => {
    document.getElementById('business-tel-1').addEventListener('input', function(e) {
      let tel = this.value
      if (tel.length > 10) {
        document.getElementById('business-tel-1').value = tel.substring(0, 3)
        document.getElementById('business-tel-2').value = tel.substring(3, 7)
        document.getElementById('business-tel-3').value = tel.substring(7)
      }
    });
  })

  function clickSubmit(e) {

    e.preventDefault()
    e.stopPropagation()

    let validForm = true;  //필수입력을 체크하기 위한 플래그

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
    .forEach(function (form) {
      if (!form.checkValidity()) {
        validForm = false
      }
      form.classList.add('was-validated')
    })

    if (!validForm) {
      return;
    }
  
    
    const form = document.getElementById('apply-form');
    const inputs = form.querySelectorAll('input');
    const selects = form.querySelectorAll('select');
    const textareas = form.querySelectorAll('textarea');

    const formData = {};

    inputs.forEach(input => {
      formData[input.name] = input.value;
    });

    selects.forEach(select => {
      formData[select.name] = select.value;
    })

    textareas.forEach(textarea => {
      formData[textarea.name] = textarea.value;
    })

    sendRequest(formData)

  }


  function sendRequest(data) {

    fetch('https://paysm.net/api/send-mail/alliance', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log('Response received');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    alert('요청이 성공적으로 전송되었습니다.');
    window.location.href = '/'
  }


  return (
    <div className="container" style={{backgroundColor: '#f7f7f7', maxWidth: '900px'}}>
      <main>
        <div
          className="text-center pb-5"
          style={{
            backgroundColor: "rgb(41, 71, 169)",
            paddingTop: "150px",
            color: "white",
          }}
        >
          {/*<img
            className="d-block mx-auto mb-4"
            src="/img/logos/paysm-logo.png"
            alt=""
          />*/}
          <h1>업무제휴문의</h1>
          <p className="lead">
            페이즘은 사업제휴, 광고, 투자 등 어떤 문의도 환영합니다.
            <br></br>
            아래의 신청정보를 입력해주세요.
          </p>
        </div>

        <div className="row g-5 my-3">
          <div className="col-md-12 col-lg-12">
            <h3 className="mb-3">문의하기</h3>
            <form className="needs-validation pb-5" noValidate action="mailto:test@example.com?subject=subject&body=body" id='apply-form'>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="business-name" className="form-label">
                    상호명
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="business-name"
                    id="business-name"
                    placeholder="예) 스카이클래스"
                    required
                  />
                  <div className="invalid-feedback">
                    상호명을 입력해주세요.
                  </div>
                </div>

                <div className="col-12">
                  <label
                    htmlFor="business-number"
                    className="form-label"
                    style={{ display: "inline-block" }}
                  >
                    사업자등록번호*&nbsp;&nbsp;
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="business-number"
                    name="business-number"
                    placeholder="사업자등록번호. 예) 1234567890(-하이픈 제외)"
                    required
                  />

                  <div className="invalid-feedback">
                    사업자등록번호를 입력해주세요.
                  </div>
                </div>


                <div className="col-12">
                  <label htmlFor="business-tel-1" className="form-label">
                    연락처*
                  </label>
                  <div className="input-group has-validation" style={{maxWidth : '350px'}}>
                    <input
                      type="text"
                      className="form-control"
                      id="business-tel-1"
                      name="business-tel-1"
                      style={{ display: "inline-block" }}
                      required
                    />
                    <span className="input-group-text">-</span>
                    <input
                      type="text"
                      className="form-control"
                      id="business-tel-2"
                      name="business-tel-2"
                      style={{ display: "inline-block" }}
                      required
                    />
                    <span className="input-group-text">-</span>
                    <input
                      type="text"
                      className="form-control"
                      id="business-tel-3"
                      name="business-tel-3"
                      style={{ display: "inline-block" }}
                      required
                    />
                    <div className="invalid-feedback">
                      연락처를 입력해주세요.
                    </div>
                  </div>
                </div>


                <div className="col-12">
                  <label htmlFor="business-email" className="form-label">
                    이메일 주소*
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="business-email"
                      name="business-email"
                      placeholder="business-email"
                      required
                    />

                    <div className="invalid-feedback">
                      이메일을 입력해주세요.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="title" className="form-label">
                    제목
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    placeholder="예) [스카이클래스] 마케팅제휴제안"
                    required
                  />
                  <div className="invalid-feedback">
                    제목을 입력해주세요.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="request" className="form-label">
                    문의내용
                  </label>
                  <textarea className="form-control" id="request" name="request" rows="3" required></textarea>
                  <div className="invalid-feedback">
                    문의내용을 입력해주세요.
                  </div>
                </div>
              </div>


              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" onClick={clickSubmit}>
                제출
              </button>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}

export default AllianceForm;
