// 메세지 전송 테스트
describe('메세지 입력 영역 테스트', () => {
  beforeEach(() => {
    // 모든 테스트 단위(it) 실행 전에 실행한다.
    cy.log('페이지 방문 시작');

    cy.visit('/');

    cy.log('페이지 방문 완료');
  });

  // 메세지 전송 테스트의 하위 테스트 단위 (it)
  it('메세지 입력 후 엔터로 전송한다.', () => {
    // 메세지 입력 영역에 메세지 입력
    // input 포커싱 상태에서 엔터 입력 - type에 특수문자 시퀀스를 추가해준다.
    const messageElement = cy.get("[data-testid='message-input']");
    const testMessage = '안녕! 챗돌이야!{enter}';
    messageElement.type(testMessage);

    // setInput 동작 여부 확인 전송한 메세지 store 저장 여부 확인
    cy.window().then((win) => {
      // 함수에 스파이 설정

      // app 객체가 있는지 확인

      //cy.spy(win.app, 'handleSend').as('submitSpy');

      // 함수가 호출되었는지 확인
      //cy.get('@submitSpy').should('be.called');

      // 정상실행된 증거로 UI에 메세지가 표시되는지 확인
      //messageElement.last().should('contain', testMessage);

      // 정상실행된 증거로 입력 필드가 비워졌는지 확인
      messageElement.should('have.value', '');
    });

    // chat mutation이 정상 동작하는지 확인
  });

  it("AI로부터 답변을 대기 하고 있을때 '입력중' 메세지 노출 여부 확인", () => {
    // 입력중.. 메세지가 노출되는지 확인
    cy.log("AI로부터 답변을 대기 하고 있을때 '입력중' 메세지 노출 여부 확인");
  });

  it('메세지 리스트에 보낸 메세지와 답변이 노출되는지 확인', () => {
    // 메세지 리스트에 보낸 메세지와 답변이 노출되는지 확인
    cy.log('메세지 리스트에 보낸 메세지와 답변이 노출되는지 확인');
    // store에 저장된 메세지를 가져오는지 확인
  });
});
