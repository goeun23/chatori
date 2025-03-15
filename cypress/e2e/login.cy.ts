describe('기본 테스트', () => {
    it('테스트가 실행되는지 확인', () => {
      cy.log('이 테스트는 실행되고 있습니다');
      expect(true).to.equal(true);
    });
  });
describe('Google 로그인 테스트', () => {
    
    beforeEach(() => {
    // 페이지 방문 전에 로그 출력
    cy.log('페이지 방문 시작');
    
    // 페이지 방문
    cy.visit('/');
    
    // 페이지 로드 확인
    cy.log('페이지 방문 완료');
    });

  it('로그인 버튼이 표시되어야 합니다', () => {
    // Google 로그인 컨테이너가 존재하는지 확인
    cy.get('[data-testid="temp-login-button"]').should('exist');
    
    // 로그인 버튼 래퍼가 표시되는지 확인
    cy.get('[data-testid="google-login-wrapper"]').should('be.visible');
  });

  it('로그인 후 사용자 프로필이 표시되어야 합니다', () => {
    // 로그인 상태를 모의(mock)로 설정
    cy.window().then((win) => {
      // localStorage에 인증 정보 설정
      win.localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: { name: '테스트 사용자', email: 'test@example.com' },
          token: 'fake-token-123',
          isLogin: true
        },
        version: 0
      }));
    });
    
    // 페이지 새로고침하여 상태 적용
    cy.reload();
    
    // 사용자 프로필이 표시되는지 확인
    cy.get('[data-testid="user-profile"]').should('be.visible');
    
    // 사용자 인사말에 이름이 포함되어 있는지 확인
    cy.get('[data-testid="user-greeting"]').should('contain', '테스트 사용자');
    
    // 로그아웃 버튼이 표시되는지 확인
    cy.get('[data-testid="logout-button"]').should('be.visible');
  });

  it('로그아웃 버튼 클릭 시 로그인 상태가 해제되어야 합니다', () => {
    // 로그인 상태 설정
    cy.window().then((win) => {
      win.localStorage.setItem('auth-storage', JSON.stringify({
        state: {
          user: { name: '테스트 사용자', email: 'test@example.com' },
          token: 'fake-token-123',
          isLogin: true
        },
        version: 0
      }));
    });
    
    cy.reload();
    
    // 로그아웃 버튼 클릭
    cy.get('[data-testid="logout-button"]').click();
    
    // 로그인 버튼이 다시 표시되는지 확인
    cy.get('[data-testid="google-login-wrapper"]').should('be.visible');
    
    // localStorage에서 인증 정보가 제거되었는지 확인
    cy.window().then((win) => {
      const authStorage = JSON.parse(win.localStorage.getItem('auth-storage') || '{}');
      expect(authStorage.state.isLogin).to.equal(false);
      expect(authStorage.state.user).to.equal(null);
      expect(authStorage.state.token).to.equal(null);
    });
  });
});