from PyQt5.QtWidgets import QWidget, QHBoxLayout, QComboBox, QPushButton, QMessageBox
from material_descriptions import MaterialDescriptions

class InfoComboBox(QWidget):
    """Custom widget combining QComboBox with info button"""
    
    def __init__(self, items, parent=None):
        super().__init__(parent)
        layout = QHBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        
        self.combo = QComboBox()
        self.combo.addItems(items)
        
        self.info_btn = QPushButton("?")
        self.info_btn.setFixedSize(20, 20)
        self.info_btn.setStyleSheet("""
            QPushButton {
                background-color: #3498db;
                color: white;
                border-radius: 10px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #2980b9;
            }
        """)
        self.info_btn.clicked.connect(self.show_info)
        
        layout.addWidget(self.combo)
        layout.addWidget(self.info_btn)
        self.setLayout(layout)
    
    def currentText(self):
        return self.combo.currentText()
    
    def show_info(self):
        MaterialDescriptions.show_info(self, self.combo.currentText())
    
    def clear(self):
        self.combo.clear()
    
    def addItems(self, items):
        self.combo.addItems(items)