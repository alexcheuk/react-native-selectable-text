import ExpoModulesCore
import UIKit

class ReactNativeSelectableTextView: UITextView {
  let onTextSelectionChange = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(frame: .zero, textContainer: nil)
    
    // Set up text view properties
    text = "Hello from iOS UITextView!"
    font = UIFont.systemFont(ofSize: 18)
    isSelectable = true
    isEditable = false
    backgroundColor = UIColor.clear
    delegate = self
    isScrollEnabled = false // Disable scrolling to allow natural sizing
    textContainer.lineFragmentPadding = 0 // Remove default padding
    textContainerInset = UIEdgeInsets.zero // Remove default insets
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override func sizeThatFits(_ size: CGSize) -> CGSize {
    // Return the size that the text needs
    let textSize = super.sizeThatFits(CGSize(width: size.width, height: CGFloat.greatestFiniteMagnitude))
    return CGSize(width: min(textSize.width, size.width), height: textSize.height)
  }
  
  override var intrinsicContentSize: CGSize {
    // Provide intrinsic content size like a Text component
    return sizeThatFits(CGSize(width: CGFloat.greatestFiniteMagnitude, height: CGFloat.greatestFiniteMagnitude))
  }
  
  override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
    // Disable all context menu actions while keeping selection
    return false
  }
  
  override var canBecomeFirstResponder: Bool {
    // Allow the text view to become first responder to show cursor
    return true
  }
}

extension ReactNativeSelectableTextView: UITextViewDelegate {
  func textViewDidChangeSelection(_ textView: UITextView) {
    let selectedRange = textView.selectedRange
    let text = textView.text ?? ""
    
    if selectedRange.length > 0 && selectedRange.location + selectedRange.length <= text.count {
      let startIndex = text.index(text.startIndex, offsetBy: selectedRange.location)
      let endIndex = text.index(startIndex, offsetBy: selectedRange.length)
      let selectedText = String(text[startIndex..<endIndex])
      
      onTextSelectionChange([
        "selectedText": selectedText,
        "start": selectedRange.location,
        "end": selectedRange.location + selectedRange.length
      ])
    } else {
      // No selection or selection cleared
      onTextSelectionChange([
        "selectedText": "",
        "start": 0,
        "end": 0
      ])
    }
  }
}
