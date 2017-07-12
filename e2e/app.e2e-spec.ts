import { FrontentPage } from './app.po';

describe('frontent App', function() {
  let page: FrontentPage;

  beforeEach(() => {
    page = new FrontentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
