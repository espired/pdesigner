import IEditorOptionsBoard from "../../types/IEditorOptionsBoard";
import ProductTemplate, { ProductTemplateVariant } from "../../types/ProductTemplate";

export default function generateBoardConfiguration(product: ProductTemplate, variant: ProductTemplateVariant): IEditorOptionsBoard {

    const { imageLayer, backgroundLayer } = variant.locations.centerFront;

    const newBoardConfig: IEditorOptionsBoard = {
        name: product.productReferenceId,
        backgroundImage: variant.backgroundUrl,
        backgroundImageOverlay: variant.overlayUrl,
        dimensions: {
            width: backgroundLayer.X2,
            height: backgroundLayer.Y2,
        },
        clip: {
            left: imageLayer.X1,
            width: imageLayer.X2,
            top: imageLayer.Y1,
            height: imageLayer.Y2
        }
    };

    return newBoardConfig;
}