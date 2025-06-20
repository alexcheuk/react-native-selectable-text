import ExpoModulesCore

public class ReactNativeSelectableTextModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeSelectableText")

    View(ReactNativeSelectableTextView.self) {
      Prop("text") { (view: ReactNativeSelectableTextView, text: String?) in
        view.text = text ?? ""
        view.invalidateIntrinsicContentSize()
      }
      
      Prop("fontSize") { (view: ReactNativeSelectableTextView, fontSize: Double?) in
        if let fontSize = fontSize {
          view.font = (view.font ?? UIFont.systemFont(ofSize: 18)).withSize(CGFloat(fontSize))
          view.invalidateIntrinsicContentSize()
        }
      }
      
      Prop("color") { (view: ReactNativeSelectableTextView, color: UIColor?) in
        if let color = color {
          view.textColor = color
        }
      }
      
      Prop("fontWeight") { (view: ReactNativeSelectableTextView, fontWeight: String?) in
        if let fontWeight = fontWeight {
          let weight: UIFont.Weight = {
            switch fontWeight {
            case "bold", "700", "800", "900":
              return .bold
            case "600":
              return .semibold
            case "500":
              return .medium
            case "300":
              return .light
            case "100", "200":
              return .ultraLight
            default:
              return .regular
            }
          }()
          
          let currentSize = view.font?.pointSize ?? 18
          view.font = UIFont.systemFont(ofSize: currentSize, weight: weight)
          view.invalidateIntrinsicContentSize()
        }
      }
      
      Prop("fontStyle") { (view: ReactNativeSelectableTextView, fontStyle: String?) in
        if let fontStyle = fontStyle {
          let currentSize = view.font?.pointSize ?? 18
          if fontStyle == "italic" {
            view.font = UIFont.italicSystemFont(ofSize: currentSize)
          } else {
            view.font = UIFont.systemFont(ofSize: currentSize)
          }
          view.invalidateIntrinsicContentSize()
        }
      }
      
      Prop("textAlign") { (view: ReactNativeSelectableTextView, textAlign: String?) in
        if let textAlign = textAlign {
          let alignment: NSTextAlignment = {
            switch textAlign {
            case "left":
              return .left
            case "right":
              return .right
            case "center":
              return .center
            case "justify":
              return .justified
            default:
              return .left
            }
          }()
          view.textAlignment = alignment
        }
      }
      
      Prop("lineHeight") { (view: ReactNativeSelectableTextView, lineHeight: Double?) in
        if let lineHeight = lineHeight {
          let paragraphStyle = NSMutableParagraphStyle()
          paragraphStyle.lineSpacing = CGFloat(lineHeight) - (view.font?.lineHeight ?? UIFont.systemFont(ofSize: 18).lineHeight)
          paragraphStyle.alignment = view.textAlignment
          
          let attributedString = NSMutableAttributedString(string: view.text ?? "")
          attributedString.addAttribute(.paragraphStyle, value: paragraphStyle, range: NSRange(location: 0, length: attributedString.length))
          view.attributedText = attributedString
          view.invalidateIntrinsicContentSize()
        }
      }
      
      Events("onTextSelectionChange")
    }
  }
}
