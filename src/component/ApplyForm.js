import { useEffect } from "react";

function ApplyForm() {

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

  function clickPostNumber(e) {
    e.preventDefault();

    var width = 500; //팝업의 너비
    var height = 600; //팝업의 높이
    
    new window.daum.Postcode({
      width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
      height: height,
      oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        document.getElementById('zone-code').value = data.zonecode;
        document.getElementById('business-address').value = data.address

      }
    }).open({
      left: (window.screen.width / 2) - (width / 2),
      top: (window.screen.height / 2) - (height / 2)
    });


  }


  function sendRequest(data) {

    fetch('https://paysm.net/api/send-mail/apply', {
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
          <h1>서비스 신청</h1>
          <p className="lead">
            결제대행서비스 페이즘의 서비스 신청화면입니다.
            <br></br>
            아래의 신청정보를 입력해주세요.
          </p>
        </div>

        <div className="row g-5 my-3">
          <div className="col-md-12 col-lg-12">
            <h3 className="mb-3">사업자 정보입력</h3>
            <form className="needs-validation pb-5" noValidate action="mailto:test@example.com?subject=subject&body=body" id='apply-form'>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="corp-name" className="form-label">
                    회사명
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="corp-name"
                    id="corp-name"
                    placeholder="예) 스카이클래스"
                    required
                  />
                  <div className="invalid-feedback">
                    회사명을 입력해주세요.
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

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="business-type"
                    style={{
                      maxWidth: "150px",
                      height: "35px",
                      display: "inline-block",
                    }}
                  >
                    <option value="1">개인 사업자</option>
                    <option value="2">법인 사업자</option>
                    <option value="3">비영리 법인</option>
                  </select>
                  <input
                    type="number"
                    className="form-control"
                    id="business-number"
                    name="business-number"
                    placeholder="사업자등록번호. 예) 1234567890(-하이픈 제외)"
                    required
                  />

                  <div className="invalid-feedback">
                    사업자 등록번호를 입력해주세요.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="owner-name" className="form-label">
                    대표자명*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="owner-name"
                    name="owner-name"
                    placeholder="예) 홍길동"
                    required
                  />
                  <div className="invalid-feedback">
                    대표자명을 입력해주세요.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="owner-birth" className="form-label">
                    대표자 생년월일*
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="owner-birth"
                    name="owner-birth"
                    placeholder="예) 900428"
                    required
                  />
                  <div className="invalid-feedback">
                    대표자 생년월일을 입력해주세요.
                  </div>
                </div>

                <div className="col-12">
                  <h5 className="mt-5 mb-2">
                    개인사업자: 대표자명의, 법인사업자:법인명의 계좌를
                    기입해주셔야 합니다.
                  </h5>
                </div>

                <div className="col-12">
                  <label htmlFor="business-account-number" className="form-label">
                    사업자 계좌번호
                  </label>

                  <div>
                    <select
                      className="form-select"
                      name="business-account-number-type"
                      aria-label="Default select example"
                      style={{ maxWidth: "150px", display: "inline-block" }}
                    >
                      <option value="1">개인 사업자</option>
                      <option value="2">법인 사업자</option>
                      <option value="3">비영리 법인</option>
                    </select>
                    <input
                      type="number"
                      className="form-control"
                      id="business-account-number"
                      name="business-account-number"
                      placeholder="예) 1234567890(-하이픈 제외)"
                      style={{ display: "inline-block", maxWidth: '300px' }}
                      required
                    />

                    <div className="invalid-feedback">
                      사업자 계좌번호를 입력해주세요.
                    </div>
                  </div>
                </div>


                <div className="col-12">
                  <label htmlFor="account-holder" className="form-label">
                    예금주명
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="account-holder"
                    name="account-holder"
                    placeholder="예) 홍길동"
                    required
                  />
                  <div className="invalid-feedback">
                    예금주명을 입력해주세요.
                  </div>
                </div>
                

                <div className="col-12">
                  <h5 className="mt-5 mb-2">
                    사업자등록증상 주소를 입력해주세요. 상세주소까지 입력해주셔야 합니다.
                  </h5>
                </div>



                <div className="col-12">
                  <label htmlFor="business-address" className="form-label">
                    사업장 주소*
                  </label>

                  <div>

                    <input
                      type="text"
                      className="form-control me-1"
                      id="zone-code"
                      name="zone-code"
                      autoComplete="postal-code"
                      style={{ display: "inline-block", maxWidth: '300px' }}
                      required
                    />

                    <button className="btn btn-address" onClick={clickPostNumber}>우편번호 검색</button>

                    <input
                      type="text"
                      className="form-control mt-3"
                      id="business-address"
                      name="business-address"
                      autoComplete="address-level1"
                      placeholder="예) 대구광역시 중구 동덕로 115"
                      required
                    />

                    <input
                      type="text"
                      className="form-control mt-3"
                      id="business-address-detail"
                      name="business-address-detail"
                      autoComplete="street-address"
                      placeholder="예) 진석타워즈 1115호"
                      required
                    />
                    

                    <div className="invalid-feedback">
                      사업장 주소를 입력해주세요.
                    </div>
                  </div>
                </div>


                <div className="col-12">
                  <label htmlFor="business-tel-1" className="form-label">
                    사업장 대표 전화번호*
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
                      사업장 대표 전화번호를 입력해주세요.
                    </div>
                  </div>
                </div>



                <div className="col-12">
                  <label htmlFor="business-email" className="form-label">
                    사업장 대표 이메일*
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="business-email"
                      name="business-email"
                      placeholder="email"
                      required
                    />

                    <div className="invalid-feedback">
                      사업장 대표 이메일을 입력해주세요.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="corp-homepage" className="form-label">
                    회사홈페이지
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="corp-homepage"
                    name="corp-homepage"
                    placeholder="예) https://skyclassism.com"
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="request" className="form-label">
                    요청사항
                  </label>
                  <textarea className="form-control" id="request" name="request" rows="3"></textarea>
                  <div className="invalid-feedback">
                    요청사항을 입력해주세요.
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

export default ApplyForm;
