import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'ImageCarouselWebPartStrings';
import ImageCarousel from './components/ImageCarousel';
import { IImageCarouselProps, IImageCarouselConfig } from './components/IImageCarouselProps';

export interface IImageCarouselWebPartProps {
  sliderTime: number;
  numberOfImages: number;
  imageCarouselConfig: IImageCarouselConfig[];
  firstLoad: boolean;
  state: boolean;
}

export default class ImageCarouselWebPart extends BaseClientSideWebPart<IImageCarouselWebPartProps> {

  protected getDefaultConfig = (): IImageCarouselConfig => {
    return {
      imageURL: '',
      imageRedirectURL: '',
      imageText: ''
    };
  }

  public render(): void {

    if (!this.properties.state) {
      this.properties.state = true;
      this.properties.firstLoad = true;
      this.properties.numberOfImages = 1;
      this.properties.imageCarouselConfig = [];
      this.properties.imageCarouselConfig.push(this.getDefaultConfig());
    }

    const element: React.ReactElement<IImageCarouselProps> = React.createElement(
      ImageCarousel,
      {
        description: ""
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onPropertyPaneConfigurationStart(): void {
    if (this.properties.firstLoad || this.properties.imageCarouselConfig[0].imageURL.length <= 0) {
      this.properties.firstLoad = false;
      const firstLoadData: IImageCarouselConfig = this.getDefaultConfig();
      this.properties.imageCarouselConfig.push(firstLoadData);
    }
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void { 
    
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected checkIfValidURL = (value: string): string => {
    let regexExp: RegExp = new RegExp(/(http(s):)([/|.|\w|\s|-])*\.(?:jpg|png)/);
    if (regexExp.test(value)) {
      return "";
    }
    return "Image URL should end with jpg or png";
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let columnPropertyOptions: any[];

    columnPropertyOptions = [{
      groupName: "Webpart Configuration",
      groupFields: [
        PropertyPaneSlider('numberOfImages', {
          label: "How many images do you want to show?",
          min: 1,
          max: 10,
          value: this.properties.numberOfImages
        }),
        PropertyPaneSlider('sliderTime', {
          label: "Set the time (in sec) for image change",
          min: 5,
          max: 20,
          value: this.properties.sliderTime
        })
      ]
    }];

    for (let i = 0; i < this.properties.numberOfImages; i++) {
      columnPropertyOptions.push(
        {
          groupName: `Image ${i + 1} Configuration`,
          groupFields: [
            PropertyPaneTextField(`imageCarouselConfig[${i}]["imageURL"]`, {
              label: "Add the image URL",
              onGetErrorMessage: this.checkIfValidURL.bind(this),
              deferredValidationTime: 700,
            }),
            PropertyPaneTextField(`imageCarouselConfig[${i}]["imageRedirectURL"]`, {
              label: "Add a redirection URL for your image",
              placeholder: "Redirect URL",
            }),
            PropertyPaneTextField(`imageCarouselConfig[${i}]["imageText"]`, {
              label: "Add a description to your image",
              multiline: true,
              placeholder: "Description",
              maxLength: 175
            }),
          ],
        }
      );

    }

    return {
      pages: [
        {
          header: {
            description: "Add upto 10 images as part of your Picture Carousel"
          },
          groups: columnPropertyOptions
        }
      ]
    };
  }
}
