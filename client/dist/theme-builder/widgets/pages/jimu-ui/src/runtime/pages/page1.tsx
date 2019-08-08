import { React } from 'jimu-core';
import { Switch, Image, ImageProps, Card, CardProps, 
  List, Link,
  Tabs, Tab } from 'jimu-ui';
import {ColorResult} from 'react-color';

export class Page1 extends React.PureComponent<{}, any> {
  onColorChange = (result: ColorResult) => {
    console.log('Color result:', result.hex);
  }

  render() {
    const CARDIMAGE1: ImageProps = {
      src: 'http://via.placeholder.com/320x180',
      alt: 'Card image cap'
    };

    const CARDIMAGE2: ImageProps = {
      src: 'http://via.placeholder.com/120x120',
      alt: 'Card image cap',
      shape: 'circle',
      height: 120
    };

    const CARDIMAGE3: ImageProps = {
      src: 'http://via.placeholder.com/64x64',
      alt: 'Card image cap',
      shape: 'circle',
      height: 64
    };

    const LISTDATA1 = ['aaa', 'bbb', 'ccc'];

    const LISTDATA2: CardProps[] = Array.apply(null, { length: 5 }).map((n, index) => {
      return {
        title: `Card title ${++index}`,
        description: `Some quick example text to build on the card title and make up 
        the bulk of the card's content.`,
        image: CARDIMAGE2,
        horizontal: true
      }
    });

    const LISTDATA3: CardProps[] = Array.apply(null, { length: 5 }).map((n, index) => {
      return {
        title: `Card title ${++index}`,
        description: `Some quick example text to build on the card title and make up the 
        bulk of the card's content.`,
        image: CARDIMAGE2
      }
    });

    let toggleValueLogger = (evt) => {
      console.log(`Toggle's value is: ${evt.target.checked}`);
    }

    return (
      <div>
        <h2>Toggle Button</h2>
        <Switch onChange={toggleValueLogger} className="mr-4" />
        <Switch checked className="mr-4" />
        <Switch disabled className="mr-4" />
        <Switch checked disabled />
        <hr />

        <h2>Link</h2>
        <Link to="?a=1">Link1</Link>
        <hr />

        {/* IMAGE: START */}
        <h2>Image:</h2>
        <Image
          src="https://www.esri.com/content/dam/esrisites/home/uc-2018-agenda.jpg"
          alt="this is an Image component"
          type="fluid"
          className="mb-3" />
        <h6>Circled:</h6>
        <Image
          src="https://www.esri.com/content/dam/esrisites/about/events/user-conference-2018/assets/dynamic-content-agenda.jpg"
          alt="this is an Image component"
          shape="circle"
          width="200"
          className="mb-3" />
        {/* IMAGE: END */}
        <hr className="mb-5" />
        {/* CARD: START */}
        <h2>Cards:</h2>
        <div className="row mb-3">
          <div className="col-sm-4 col-xs-6">
            <Card
              title="Card title"
              description="Some quick example text to build on the card title and make up the bulk of the card's content."
              image={CARDIMAGE1} />
          </div>
          <div className="col-sm-4 col-xs-6">
            <Card
              title="Card title"
              description="Some quick example text to build on the card title and make up the bulk of the card's content."
              image={CARDIMAGE2} />
          </div>
          <div className="col-sm-4 col-xs-6">
            <Card
              title="Card title"
              image={CARDIMAGE2} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-6 col-sm-12">
            <Card
              title="Card title"
              description="Some quick example text to build on the card title and make up the bulk of the card's content."
              image={CARDIMAGE2}
              className="mb-3"
              horizontal />
          </div>
          <div className="col-lg-6 col-sm-12">
            <Card
              title="Card title"
              image={CARDIMAGE3}
              horizontal
              contentJustify="center" />
          </div>
        </div>
        {/* CARD: END */}
        <hr className="mb-5" />
        {/* List: START */}
        <h2 className="mb-3">List:</h2>
        <h6>List of texts:</h6>
        <List
          dataSource={LISTDATA1}
          className="mb-5" />
        <h6>List of cards:</h6>
        <List
          className="mb-5"
          dataSource={LISTDATA2}
           />
        <h6>List of cards (horizontal):</h6>
        <List horizontal
          cardWidth="240"
          dataSource={LISTDATA3} />
        {/* List: END */}

        <hr />
      
        {/* TABS: START */}
        <h2>Tabs:</h2>
        <Tabs>
          <Tab title="Data" active={true}>
            <p>Test1</p>
          </Tab>
          <Tab title="Widgets">
          <p>Test2</p>
          </Tab>
        </Tabs>
        {/* TABS: END */}
      </div>
    )
  }
}