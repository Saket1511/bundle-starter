import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';
import { FormattedMessage } from 'react-intl';
import { mockMutation, setMutation } from '@apollo/client';
import { mockShowNotification } from '@commercetools-frontend/actions-global';
import * as AppContext from '@commercetools-frontend/application-shell-connectors';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { ATTRIBUTES, MASTER_VARIANT_ID } from '../../constants';
import { generateProduct, generateSubmittedFormValues } from '../../test-util';
import { transformResults } from '../bundle-details/dynamic-bundle-details';
import EditBundleForm from './edit-bundle-form';
import BundleForm from '../bundle-form';
import messages from './messages';

const project = {
  key: faker.random.word(),
  languages: [faker.random.locale(), faker.random.locale()],
};
const dataLocale = project.languages[0];
const product = generateProduct(project.languages);
const bundle = { ...product, ...transformResults(product.masterData.current) };
const formValues = generateSubmittedFormValues();
const { id, version } = formValues;
const variables = {
  target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
  id,
  version,
};

const mocks = {
  bundle,
  onComplete: jest.fn(),
};

const loadEditBundleForm = () => shallow(<EditBundleForm {...mocks} />);

describe('edit bundle form', () => {
  let wrapper;

  const submitForm = (value) =>
    wrapper
      .find(BundleForm)
      .props()
      .onSubmit({ id, version, ...value });

  beforeEach(() => {
    jest
      .spyOn(AppContext, 'useApplicationContext')
      .mockImplementation(() => ({ project, dataLocale }));

    mocks.onComplete.mockClear();
    mockShowNotification.mockClear();
  });

  describe('when form submitted', () => {
    const data = { updateProduct: bundle };

    beforeEach(() => {
      setMutation({ data });
      wrapper = loadEditBundleForm();
    });

    it('with updated name, should modify bundle name', () => {
      const { name } = formValues;
      submitForm({ name });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [{ changeName: { name } }],
        },
      });
    });

    it('with updated description, should modify bundle description', () => {
      const { description } = formValues;
      submitForm({ description });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setDescription: { description },
            },
          ],
        },
      });
    });

    it('with updated key, should set bundle key', () => {
      const { key } = formValues;
      submitForm({ key });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setKey: { key },
            },
          ],
        },
      });
    });

    it('with updated sku, should set bundle sku', () => {
      const { sku } = formValues;
      submitForm({ sku });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setSku: { variantId: MASTER_VARIANT_ID, sku },
            },
          ],
        },
      });
    });

    it('with dynamic price, should set bundle as dynamically priced', () => {
      const dynamicPrice = 'true';
      submitForm({ dynamicPrice });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.DYNAMIC_PRICE,
                value: dynamicPrice,
              },
            },
          ],
        },
      });
    });

    it('with min quantity, should update bundle min quantity', () => {
      const { minQuantity } = formValues;
      submitForm({ minQuantity });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.MIN_QUANTITY,
                value: minQuantity,
              },
            },
          ],
        },
      });
    });

    it('with empty min quantity, should remove update bundle min quantity', () => {
      submitForm({ minQuantity: '' });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.MIN_QUANTITY,
              },
            },
          ],
        },
      });
    });

    it('with max quantity, should update bundle max quantity', () => {
      const { maxQuantity } = formValues;
      submitForm({ maxQuantity });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.MAX_QUANTITY,
                value: maxQuantity,
              },
            },
          ],
        },
      });
    });

    it('with empty max quantity, should remove update bundle max quantity', () => {
      submitForm({ maxQuantity: '' });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.MAX_QUANTITY,
              },
            },
          ],
        },
      });
    });

    it('with categories, should update bundle categories', () => {
      const { categories, categorySearch } = formValues;
      submitForm({ categories, categorySearch });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.CATEGORIES,
                value: categories,
              },
            },
            {
              setAttribute: {
                variantId: MASTER_VARIANT_ID,
                name: ATTRIBUTES.CATEGORY_SEARCH,
                value: categorySearch,
              },
            },
          ],
        },
      });
    });

    it('with updated slug, should update bundle slug', () => {
      const { slug } = formValues;
      submitForm({ slug });
      expect(mockMutation).toHaveBeenCalledWith({
        variables: {
          ...variables,
          actions: [
            {
              changeSlug: { slug },
            },
          ],
        },
      });
    });
  });

  describe('when form submission completes', () => {
    const data = { updateProduct: bundle };
    beforeEach(async () => {
      setMutation({ data });
      wrapper = loadEditBundleForm();
      const { name } = formValues;
      await submitForm({ name });
    });

    it('should invoke on complete', () => {
      expect(mocks.onComplete).toHaveBeenCalled();
    });

    it('should show success notification', () => {
      expect(mockShowNotification).toHaveBeenCalledWith(
        {
          text: <FormattedMessage {...messages.editSuccess} />,
        },
        data
      );
    });
  });

  describe('when form submission fails', () => {
    const error = {};
    const { name } = formValues;

    beforeEach(() => {
      setMutation({ error });
      wrapper = loadEditBundleForm();
    });

    it('should not invoke on complete', async () => {
      try {
        await submitForm({ name });
      } catch (err) {
        expect(mocks.onComplete).not.toHaveBeenCalled();
      }
    });

    it('should show error notification', async () => {
      try {
        await submitForm({ name });
      } catch (err) {
        expect(mockShowNotification).toHaveBeenCalledWith(
          {
            text: <FormattedMessage {...messages.editError} />,
          },
          error
        );
      }
    });
  });
});
