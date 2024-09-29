// Constants
const BOARD_SIZE = 8;
const PLAYER_WHITE = 'white';
const PLAYER_BLACK = 'black';

// Piece types
const PAWN = 'pawn';
const ROOK = 'rook';
const KNIGHT = 'knight';
const BISHOP = 'bishop';
const QUEEN = 'queen';
const KING = 'king';

// DOM elements
const landingPage = document.getElementById('landing-page');
const gameContainer = document.getElementById('game-container');
const playButton = document.getElementById('play-button');
const board = document.getElementById('chessboard');
const boardLabels = document.getElementById('board-labels');
const fileLabels = document.getElementById('file-labels');
const moveHistory = document.getElementById('move-history').querySelector('tbody');
const newGameButton = document.getElementById('new-game');
const undoButton = document.getElementById('undo-move');
const redoButton = document.getElementById('redo-move');
const flipBoardButton = document.getElementById('flip-board');
const startTimerButton = document.getElementById('start-timer');
const whiteTimer = document.getElementById('white-timer');
const blackTimer = document.getElementById('black-timer');
const promotionModal = document.getElementById('promotion-modal');
const promotionChoices = document.getElementById('promotion-choices');
const notification = document.getElementById('notification');
const analysisProgress = document.getElementById('analysis-progress');
const gameInfo = document.getElementById('game-info');
const gameInfoToggle = document.getElementById('game-info-toggle');
const toggleInfoButton = document.getElementById('toggle-info');
const settingsButton = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsButton = document.getElementById('close-settings');
const showLabelsCheckbox = document.getElementById('show-labels');
const boardSizeSlider = document.getElementById('board-size');
const decreaseSizeButton = document.getElementById('decrease-size');
const increaseSizeButton = document.getElementById('increase-size');
const animationSpeedSlider = document.getElementById('animation-speed');
const soundEffectsCheckbox = document.getElementById('sound-effects');
const aiMoveButton = document.getElementById('ai-move');
const whiteCapturedContainer = document.getElementById('white-captured');
const blackCapturedContainer = document.getElementById('black-captured');

// Game state
let gameBoard = [];
let currentPlayer = PLAYER_WHITE;
let selectedPiece = null;
let moveCount = 1;
let gameOver = false;
let lastMove = null;
let kingPositions = {
    [PLAYER_WHITE]: { row: 7, col: 4 },
    [PLAYER_BLACK]: { row: 0, col: 4 }
};
let moveStack = [];
let redoStack = [];
let boardOrientation = PLAYER_WHITE;
let timers = {
    [PLAYER_WHITE]: 600,
    [PLAYER_BLACK]: 600
};
let timerInterval;
let pendingPromotion = null;
let timerStarted = false;
let currentPieceStyle = 'unicode';
let animationSpeed = 1;
let soundEffectsEnabled = true;
let capturedPieces = {
    [PLAYER_WHITE]: [],
    [PLAYER_BLACK]: []
};

// Piece Unicode representations
const PIECE_UNICODE = {
    [PLAYER_WHITE]: {
        [PAWN]: '♙', [ROOK]: '♖', [KNIGHT]: '♘', 
        [BISHOP]: '♗', [QUEEN]: '♕', [KING]: '♔'
    },
    [PLAYER_BLACK]: {
        [PAWN]: '♟', [ROOK]: '♜', [KNIGHT]: '♞', 
        [BISHOP]: '♝', [QUEEN]: '♛', [KING]: '♚'
    }
};

// Piece image representations
const PIECE_IMAGES = {
    classic: {
        [PLAYER_WHITE]: {
            [PAWN]: 'assets/chesspieces/Modern/white-pawn.png',
            [ROOK]: 'assets/chesspieces/Modern/white-rook.png',
            [KNIGHT]: 'assets/chesspieces/Modern/white-knight.png',
            [BISHOP]: 'assets/chesspieces/Modern/white-bishop.png',
            [QUEEN]: 'assets/chesspieces/Modern/white-queen.png',
            [KING]: 'assets/chesspieces/Modern/white-king.png'
        },
        [PLAYER_BLACK]: {
            [PAWN]: 'assets/chesspieces/Modern/black-pawn.png',
            [ROOK]: 'assets/chesspieces/Modern/black-rook.png',
            [KNIGHT]: 'assets/chesspieces/Modern/black-knight.png',
            [BISHOP]: 'assets/chesspieces/Modern/black-bishop.png',
            [QUEEN]: 'assets/chesspieces/Modern/black-queen.png',
            [KING]: 'assets/chesspieces/Modern/black-king.png'
        }
    },
    modern: {
        [PLAYER_WHITE]: {
            [PAWN]: 'assets/chesspieces/Modern2/w_pawn.png',
            [ROOK]: 'assets/chesspieces/Modern2/w_rook.png',
            [KNIGHT]: 'assets/chesspieces/Modern2/w_knight.png',
            [BISHOP]: 'assets/chesspieces/Modern2/w_bishop.png',
            [QUEEN]: 'assets/chesspieces/Modern2/w_queen.png',
            [KING]: 'assets/chesspieces/Modern2/w_king.png'
        },
        [PLAYER_BLACK]: {
            [PAWN]: 'assets/chesspieces/Modern2/b_pawn.png',
            [ROOK]: 'assets/chesspieces/Modern2/b_rook.png',
            [KNIGHT]: 'assets/chesspieces/Modern2/b_knight.png',
            [BISHOP]: 'assets/chesspieces/Modern2/b_bishop.png',
            [QUEEN]: 'assets/chesspieces/Modern2/b_queen.png',
            [KING]: 'assets/chesspieces/Modern2/b_king.png'
        }
    },
    aesthetic: {
        [PLAYER_WHITE]: {
            [PAWN]: 'assets/chesspieces/Aesthetic/Piece=Pawn, Side=White.png',
            [ROOK]: 'assets/chesspieces/Aesthetic/Piece=Rook, Side=White.png',
            [KNIGHT]: 'assets/chesspieces/Aesthetic/Piece=Knight, Side=White.png',
            [BISHOP]: 'assets/chesspieces/Aesthetic/Piece=Bishop, Side=White.png',
            [QUEEN]: 'assets/chesspieces/Aesthetic/Piece=Queen, Side=White.png',
            [KING]: 'assets/chesspieces/Aesthetic/Piece=King, Side=White.png'
        },
        [PLAYER_BLACK]: {
            [PAWN]: 'assets/chesspieces/Aesthetic/Piece=Pawn, Side=Black.png',
            [ROOK]: 'assets/chesspieces/Aesthetic/Piece=Rook, Side=Black.png',
            [KNIGHT]: 'assets/chesspieces/Aesthetic/Piece=Knight, Side=Black.png',
            [BISHOP]: 'assets/chesspieces/Aesthetic/Piece=Bishop, Side=Black.png',
            [QUEEN]: 'assets/chesspieces/Aesthetic/Piece=Queen, Side=Black.png',
            [KING]: 'assets/chesspieces/Aesthetic/Piece=King, Side=Black.png'
            }
    },
    pixel: {
        [PLAYER_WHITE]: {
            [PAWN]: 'assets/chesspieces/Pixel/pawn.png',
            [ROOK]: 'assets/chesspieces/Pixel/rook.png',
            [KNIGHT]: 'assets/chesspieces/Pixel/knight.png',
            [BISHOP]: 'assets/chesspieces/Pixel/bishop.png',
            [QUEEN]: 'assets/chesspieces/Pixel/queen.png',
            [KING]: 'assets/chesspieces/Pixel/king.png'
        },
        [PLAYER_BLACK]: {
            [PAWN]: 'assets/chesspieces/Pixel/pawn1.png',
            [ROOK]: 'assets/chesspieces/Pixel/rook1.png',
            [KNIGHT]: 'assets/chesspieces/Pixel/knight1.png',
            [BISHOP]: 'assets/chesspieces/Pixel/bishop1.png',
            [QUEEN]: 'assets/chesspieces/Pixel/queen1.png',
            [KING]: 'assets/chesspieces/Pixel/king1.png'
        }
    },
    _3d_BW: {
        [PLAYER_WHITE]: {
            [PAWN]: 'assets/chesspieces/BD3D/pawnW3.png',
            [ROOK]: 'assets/chesspieces/BD3D/rookW3.png',
            [KNIGHT]: 'assets/chesspieces/BD3D/knightW3.png',
            [BISHOP]: 'assets/chesspieces/BD3D/bishopW3.png',
            [QUEEN]: 'assets/chesspieces/BD3D/queenW3.png',
            [KING]: 'assets/chesspieces/BD3D/kingW3.png'
        },
        [PLAYER_BLACK]: {
            [PAWN]: 'assets/chesspieces/BD3D/pawnB3.png',
            [ROOK]: 'assets/chesspieces/BD3D/rookB3.png',
            [KNIGHT]: 'assets/chesspieces/BD3D/knightB3.png',
            [BISHOP]: 'assets/chesspieces/BD3D/bishopB3.png',
            [QUEEN]: 'assets/chesspieces/BD3D/queenB3.png',
            [KING]: 'assets/chesspieces/BD3D/kingB3.png'
            }
    },
    _2d_BW: {
        [PLAYER_WHITE]: {
            [PAWN]: 'assets/chesspieces/BD2D/pawnW.png',
            [ROOK]: 'assets/chesspieces/BD2D/rookW.png',
            [KNIGHT]: 'assets/chesspieces/BD2D/knightW.png',
            [BISHOP]: 'assets/chesspieces/BD2D/bishopW.png',
            [QUEEN]: 'assets/chesspieces/BD2D/queenW.png',
            [KING]: 'assets/chesspieces/BD2D/kingW.png'
        },
        [PLAYER_BLACK]: {
            [PAWN]: 'assets/chesspieces/BD2D/pawnB.png',
            [ROOK]: 'assets/chesspieces/BD2D/rookB.png',
            [KNIGHT]: 'assets/chesspieces/BD2D/knightB.png',
            [BISHOP]: 'assets/chesspieces/BD2D/bishopB.png',
            [QUEEN]: 'assets/chesspieces/BD2D/queenB.png',
            [KING]: 'assets/chesspieces/BD2D/kingB.png'
            }
    }
};

const SOUND_EFFECTS = {
    move: new Audio('path/to/move-sound.mp3'),
    capture: new Audio('path/to/capture-sound.mp3'),
    check: new Audio('path/to/check-sound.mp3'),
    gameOver: new Audio('path/to/game-over-sound.mp3')
};

// Preload audio files
Object.values(SOUND_EFFECTS).forEach(audio => audio.load());

function initializeBoard() {
    gameBoard = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null));
    
    // Set up pawns
    for (let i = 0; i < BOARD_SIZE; i++) {
        gameBoard[1][i] = { type: PAWN, color: PLAYER_BLACK };
        gameBoard[6][i] = { type: PAWN, color: PLAYER_WHITE };
    }
    
    // Set up other pieces
    const setupOrder = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];
    for (let i = 0; i < BOARD_SIZE; i++) {
        gameBoard[0][i] = { type: setupOrder[i], color: PLAYER_BLACK };
        gameBoard[7][i] = { type: setupOrder[i], color: PLAYER_WHITE };
    }
    
    currentPlayer = PLAYER_WHITE;
    selectedPiece = null;
    moveCount = 1;
    gameOver = false;
    lastMove = null;
    kingPositions = {
        [PLAYER_WHITE]: {row: 7, col: 4},
        [PLAYER_BLACK]: {row: 0, col: 4}
    };
    moveStack = [];
    redoStack = [];
    timers = {
        [PLAYER_WHITE]: 600,
        [PLAYER_BLACK]: 600
    };
    timerStarted = false;
    capturedPieces = {
        [PLAYER_WHITE]: [],
        [PLAYER_BLACK]: []
    };
    
    if (isValidBoard()) {
        renderBoard();
        updateStatus();
        updateTimerDisplay();
        clearMoveHistory(); // Clear move history instead of updating it
        updateAnalysisBar();
        updateCapturedPieces();
        updateBoardState();
        updateUndoRedoButtons();
    } else {
        console.error('Failed to initialize a valid game board');
    }
}

function isValidBoard() {
    return gameBoard && 
        Array.isArray(gameBoard) && 
        gameBoard.length === BOARD_SIZE &&
        gameBoard.every(row => Array.isArray(row) && row.length === BOARD_SIZE);
}

function clearMoveHistory() {
    const moveHistoryBody = document.querySelector('#move-history tbody');
    if (moveHistoryBody) {
        moveHistoryBody.innerHTML = '';
    }
    moveCount = 1;
}

function renderBoard() {
    const board = document.getElementById('chessboard');
    const rankLabels = document.getElementById('rank-labels');
    const fileLabels = document.getElementById('file-labels');

    if (!board || !rankLabels || !fileLabels) {
        console.error('Required DOM elements are missing');
        return;
    }

    if (!isValidBoard()) {
        console.error('Game board is not properly initialized');
        return;
    }

    board.innerHTML = '';
    rankLabels.innerHTML = '';
    fileLabels.innerHTML = '';

    const files = 'abcdefgh';
    const ranks = '87654321';

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const square = document.createElement('div');
            square.classList.add('square', ((row + col) % 2 === 0) ? 'light' : 'dark');
            square.dataset.row = boardOrientation === PLAYER_WHITE ? row : 7 - row;
            square.dataset.col = boardOrientation === PLAYER_WHITE ? col : 7 - col;
            
            const piece = gameBoard[boardOrientation === PLAYER_WHITE ? row : 7 - row][boardOrientation === PLAYER_WHITE ? col : 7 - col];
            if (piece && piece.color && piece.type) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece');
                if (currentPieceStyle === 'unicode' && PIECE_UNICODE[piece.color] && PIECE_UNICODE[piece.color][piece.type]) {
                    pieceElement.textContent = PIECE_UNICODE[piece.color][piece.type];
                } else if (PIECE_IMAGES[currentPieceStyle] && PIECE_IMAGES[currentPieceStyle][piece.color] && PIECE_IMAGES[currentPieceStyle][piece.color][piece.type]) {
                    const img = document.createElement('img');
                    img.src = PIECE_IMAGES[currentPieceStyle][piece.color][piece.type];
                    img.alt = `${piece.color} ${piece.type}`;
                    pieceElement.appendChild(img);
                } else {
                    console.error('Invalid piece style or missing piece image');
                }
                square.appendChild(pieceElement);
            }
            
            square.addEventListener('click', handleSquareClick);
            board.appendChild(square);
        }
    }

    // Add board labels
    if (showLabelsCheckbox.checked) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            const rankLabel = document.createElement('div');
            rankLabel.classList.add('board-label');
            rankLabel.textContent = ranks[boardOrientation === PLAYER_WHITE ? i : 7 - i];
            rankLabels.appendChild(rankLabel);

            const fileLabel = document.createElement('div');
            fileLabel.classList.add('board-label');
            fileLabel.textContent = files[boardOrientation === PLAYER_WHITE ? i : 7 - i];
            fileLabels.appendChild(fileLabel);
        }
    }
}

// Global variable to keep track of the check state
let isKingInCheck = false;

// Handle square click event
function handleSquareClick(event) {
    if (gameOver) return;

    const clickedSquare = event.target.closest('.square');
    const row = parseInt(clickedSquare.dataset.row);
    const col = parseInt(clickedSquare.dataset.col);

    if (selectedPiece) {
        const startRow = parseInt(selectedPiece.dataset.row);
        const startCol = parseInt(selectedPiece.dataset.col);
        
        if (isValidMove(startRow, startCol, row, col)) {
            const move = movePiece(startRow, startCol, row, col);
            updateMoveHistory(move);
            switchPlayer();
        }
        
        clearHighlights();
        selectedPiece = null;
    } else {
        const piece = gameBoard[row][col];
        if (piece && piece.color === currentPlayer) {
            selectedPiece = clickedSquare;
            highlightValidMoves(row, col);
        }
    }
}

// Check if a move is valid
function isValidMove(startRow, startCol, endRow, endCol) {
    const piece = gameBoard[startRow][startCol];
    if (!piece) return false;

    const targetPiece = gameBoard[endRow][endCol];
    if (targetPiece && targetPiece.color === piece.color) {
        // Prevent capturing own pieces
        return false;
    }

    let isValid = false;

    switch (piece.type) {
        case PAWN:
            isValid = isValidPawnMove(startRow, startCol, endRow, endCol);
            break;
        case ROOK:
            isValid = isValidRookMove(startRow, startCol, endRow, endCol);
            break;
        case KNIGHT:
            isValid = isValidKnightMove(startRow, startCol, endRow, endCol);
            break;
        case BISHOP:
            isValid = isValidBishopMove(startRow, startCol, endRow, endCol);
            break;
        case QUEEN:
            isValid = isValidQueenMove(startRow, startCol, endRow, endCol);
            break;
        case KING:
            isValid = isValidKingMove(startRow, startCol, endRow, endCol);
            break;
    }

    if (isValid) {
        // Check if the move would leave or put the current player's king in check
        const originalEndPiece = gameBoard[endRow][endCol];
        gameBoard[endRow][endCol] = piece;
        gameBoard[startRow][startCol] = null;

        const inCheck = isInCheck(currentPlayer);

        // Undo the move
        gameBoard[startRow][startCol] = piece;
        gameBoard[endRow][endCol] = originalEndPiece;

        if (inCheck) {
            return false;
        }
    }

    return isValid;
}

function doesMoveResolveCheck(startRow, startCol, endRow, endCol) {
    const piece = gameBoard[startRow][startCol];
    const originalEndPiece = gameBoard[endRow][endCol];
    
    // Temporarily make the move
    gameBoard[endRow][endCol] = piece;
    gameBoard[startRow][startCol] = null;
    
    if (piece.type === KING) {
        kingPositions[piece.color] = { row: endRow, col: endCol };
    }
    
    const stillInCheck = isInCheck(piece.color);
    
    // Undo the move
    gameBoard[startRow][startCol] = piece;
    gameBoard[endRow][endCol] = originalEndPiece;
    
    if (piece.type === KING) {
        kingPositions[piece.color] = { row: startRow, col: startCol };
    }
    
    return !stillInCheck;
}

// Check if a pawn move is valid
function isValidPawnMove(startRow, startCol, endRow, endCol) {
    const piece = gameBoard[startRow][startCol];
    const direction = piece.color === PLAYER_WHITE ? -1 : 1;
    const startingRow = piece.color === PLAYER_WHITE ? 6 : 1;

    // Move forward
    if (startCol === endCol && !gameBoard[endRow][endCol]) {
        if (endRow === startRow + direction) {
            return true;
        }
        // Double move from starting position
        if (startRow === startingRow && endRow === startRow + 2 * direction && !gameBoard[startRow + direction][startCol]) {
            return true;
        }
    }

    // Capture diagonally
    if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction) {
        if (gameBoard[endRow][endCol] && gameBoard[endRow][endCol].color !== piece.color) {
            return true;
        }
        // En passant
        if (!gameBoard[endRow][endCol] && lastMove && lastMove.piece.type === PAWN &&
            lastMove.endRow === startRow && Math.abs(lastMove.startRow - lastMove.endRow) === 2 &&
            lastMove.endCol === endCol) {
            return true;
        }
    }

    return false;
}

// Check if a rook move is valid
function isValidRookMove(startRow, startCol, endRow, endCol) {
    if (startRow !== endRow && startCol !== endCol) {
        return false;
    }

    const rowStep = startRow === endRow ? 0 : (endRow - startRow) / Math.abs(endRow - startRow);
    const colStep = startCol === endCol ? 0 : (endCol - startCol) / Math.abs(endCol - startCol);

    for (let i = 1; i < Math.max(Math.abs(endRow - startRow), Math.abs(endCol - startCol)); i++) {
        if (gameBoard[startRow + i * rowStep][startCol + i * colStep]) {
            return false;
        }
    }

    return true;
}

// Check if a knight move is valid
function isValidKnightMove(startRow, startCol, endRow, endCol) {
    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

function isValidBishopMove(startRow, startCol, endRow, endCol) {
    // Check if the move is diagonal
    if (Math.abs(endRow - startRow) !== Math.abs(endCol - startCol)) {
        return false;
    }

    const rowStep = endRow > startRow ? 1 : -1;
    const colStep = endCol > startCol ? 1 : -1;

    let currentRow = startRow + rowStep;
    let currentCol = startCol + colStep;

    // Check all squares along the diagonal path
    while (currentRow !== endRow && currentCol !== endCol) {
        if (gameBoard[currentRow][currentCol]) {
            // There's a piece blocking the path
            return false;
        }
        currentRow += rowStep;
        currentCol += colStep;
    }

    return true;
}

function getValidBishopMoves(row, col) {
    const validMoves = [];
    const directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    for (const [rowDir, colDir] of directions) {
        let newRow = row + rowDir;
        let newCol = col + colDir;

        while (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
            if (isValidBishopMove(row, col, newRow, newCol)) {
                if (gameBoard[newRow][newCol]) {
                    if (gameBoard[newRow][newCol].color !== gameBoard[row][col].color) {
                        // Can capture opponent's piece
                        validMoves.push([newRow, newCol]);
                    }
                    // Stop checking this direction after encountering any piece
                    break;
                }
                validMoves.push([newRow, newCol]);
            } else {
                // If the move is Fnot valid, stop checking this direction
                break;
            }
            newRow += rowDir;
            newCol += colDir;
        }
    }

    return validMoves;
}

// Check if a queen move is valid
function isValidQueenMove(startRow, startCol, endRow, endCol) {
    return isValidRookMove(startRow, startCol, endRow, endCol) || isValidBishopMove(startRow, startCol, endRow, endCol);
}

// Check if a king move is valid
function isValidKingMove(startRow, startCol, endRow, endCol) {
    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);

    // King can move one square in any direction
    if (rowDiff <= 1 && colDiff <= 1) {
        // Check if the move would put the king in check
        const piece = gameBoard[startRow][startCol];
        const originalEndPiece = gameBoard[endRow][endCol];
        
        // Temporarily make the move
        gameBoard[endRow][endCol] = piece;
        gameBoard[startRow][startCol] = null;

        const inCheck = isInCheck(piece.color);

        // Undo the move
        gameBoard[startRow][startCol] = piece;
        gameBoard[endRow][endCol] = originalEndPiece;

        return !inCheck;
    }

    // Check for castling
    if (rowDiff === 0 && colDiff === 2) {
        return isValidCastling(startRow, startCol, endRow, endCol);
    }

    return false;
}

// Check if castling is valid
function isValidCastling(startRow, startCol, endCol) {
    const piece = gameBoard[startRow][startCol];
    if (piece.hasMoved || isInCheck(piece.color)) {
        return false;
    }

    const direction = endCol > startCol ? 1 : -1;
    const rookCol = direction === 1 ? 7 : 0;
    const rook = gameBoard[startRow][rookCol];

    if (!rook || rook.type !== ROOK || rook.hasMoved) {
        return false;
    }

    // Check if the path is clear
    for (let col = startCol + direction; col !== rookCol; col += direction) {
        if (gameBoard[startRow][col] || isSquareUnderAttack(startRow, col, piece.color)) {
            return false;
        }
    }

    return true;
}

function isSquareUnderAttack(row, col, color) {
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const piece = gameBoard[r][c];
            if (piece && piece.color !== color) {
                if (isValidMove(r, c, row, col)) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Move a piece
function movePiece(startRow, startCol, endRow, endCol) {
    const piece = gameBoard[startRow][startCol];
    const capturedPiece = gameBoard[endRow][endCol];

    const move = {
        piece,
        startRow,
        startCol,
        endRow,
        endCol,
        capturedPiece,
        isFirstMove: !piece.hasMoved,
        isEnPassant: false,
        isCastling: false,
        promotion: null
    };

    // Handle en passant capture
    if (piece.type === PAWN && Math.abs(startCol - endCol) === 1 && !capturedPiece) {
        move.isEnPassant = true;
        move.capturedPiece = gameBoard[startRow][endCol];
        gameBoard[startRow][endCol] = null;
    }

    // Handle castling
    if (piece.type === KING && Math.abs(startCol - endCol) === 2) {
        move.isCastling = true;
        const direction = endCol > startCol ? 1 : -1;
        const rookStartCol = direction === 1 ? 7 : 0;
        const rookEndCol = direction === 1 ? 5 : 3;
        gameBoard[endRow][rookEndCol] = gameBoard[startRow][rookStartCol];
        gameBoard[startRow][rookStartCol] = null;
        gameBoard[endRow][rookEndCol].hasMoved = true;
    }

    // Animate the piece movement
    animatePieceMovement(startRow, startCol, endRow, endCol);

    gameBoard[endRow][endCol] = piece;
    gameBoard[startRow][startCol] = null;

    // Update king position if necessary
    if (piece.type === KING) {
        kingPositions[piece.color] = { row: endRow, col: endCol };
    }

    // Mark piece as moved
    piece.hasMoved = true;

    // Handle pawn promotion
    if (piece.type === PAWN && (endRow === 0 || endRow === 7)) {
        showPromotionModal(endRow, endCol);
        move.promotion = 'Q'; // Default to Queen promotion
    }

    // Update captured pieces
    if (capturedPiece) {
        capturedPieces[piece.color].push(capturedPiece);
        updateCapturedPieces();
    }

    lastMove = move;
    moveStack.push(move);
    redoStack = []; // Clear redo stack when a new move is made

    renderBoard();
    updateAnalysisBar();
    updateUndoRedoButtons();

    // Play sound effect
    if (soundEffectsEnabled) {
        if (capturedPiece) {
            SOUND_EFFECTS.capture.play();
        } else {
            SOUND_EFFECTS.move.play();
        }
    }

    updateBoardState();
    return move;
}

function flashSquare(row, col) {
    const square = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
    if (square) {
        square.classList.add('flash');
        setTimeout(() => square.classList.remove('flash'), 300);
    }
}

// Animate piece movement
function animatePieceMovement(startRow, startCol, endRow, endCol) {
    const startSquare = board.querySelector(`[data-row="${startRow}"][data-col="${startCol}"]`);
    const endSquare = board.querySelector(`[data-row="${endRow}"][data-col="${endCol}"]`);
    const piece = startSquare.querySelector('.piece');

    if (piece) {
        const clone = piece.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.zIndex = '1000';
        document.body.appendChild(clone);
        
        const startRect = startSquare.getBoundingClientRect();
        const endRect = endSquare.getBoundingClientRect();
        
        const moveX = endRect.left - startRect.left;
        const moveY = endRect.top - startRect.top;
        
        clone.style.left = `${startRect.left}px`;
        clone.style.top = `${startRect.top}px`;
        
        clone.style.setProperty('--move-x', `${moveX}px`);
        clone.style.setProperty('--move-y', `${moveY}px`);
        
        clone.classList.add('moving-piece');
        clone.style.animationDuration = `${0.3 / animationSpeed}s`;
        
        setTimeout(() => {
            document.body.removeChild(clone);
        }, 300 / animationSpeed);
    }
}

// Undo the last move
function undoMove() {
    if (moveStack.length === 0) return;

    const move = moveStack.pop();
    redoStack.push(move);

    const { piece, startRow, startCol, endRow, endCol, capturedPiece, isFirstMove, isEnPassant, isCastling, promotion } = move;

    // Undo the move
    gameBoard[startRow][startCol] = piece;
    gameBoard[endRow][endCol] = capturedPiece;

    // Restore the piece's first move status
    piece.hasMoved = !isFirstMove;

    // Handle en passant
    if (isEnPassant) {
        gameBoard[startRow][endCol] = capturedPiece;
        gameBoard[endRow][endCol] = null;
    }

    // Handle castling
    if (isCastling) {
        const direction = endCol > startCol ? 1 : -1;
        const rookStartCol = direction === 1 ? 7 : 0;
        const rookEndCol = direction === 1 ? 5 : 3;
        gameBoard[startRow][rookStartCol] = gameBoard[endRow][rookEndCol];
        gameBoard[endRow][rookEndCol] = null;
        gameBoard[startRow][rookStartCol].hasMoved = false;
    }

    // Handle pawn promotion
    if (promotion) {
        gameBoard[startRow][startCol] = { type: PAWN, color: piece.color, hasMoved: !isFirstMove };
    }

    // Update king position if necessary
    if (piece.type === KING) {
        kingPositions[piece.color] = { row: startRow, col: startCol };
    }

    // Update captured pieces
    if (capturedPiece) {
        const capturedColor = piece.color === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
        const index = capturedPieces[piece.color].findIndex(p => p.type === capturedPiece.type);
        if (index !== -1) {
            capturedPieces[piece.color].splice(index, 1);
        }
    }

    // Switch back to the previous player
    currentPlayer = currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;

    // Update the game state
    gameOver = false;
    lastMove = moveStack.length > 0 ? moveStack[moveStack.length - 1] : null;

    renderBoard();
    updateStatus();
    updateAnalysisBar();
    updateUndoRedoButtons();
    updateCapturedPieces();
    removeLastMoveFromHistory();
}

function addMoveToHistory(move) {
    const { piece, startCol, endCol, endRow, capturedPiece, promotion } = move;
    const files = 'abcdefgh';
    const ranks = '87654321';

    let moveText = '';

    if (move.isCastling) {
        moveText = endCol > startCol ? 'O-O' : 'O-O-O';
    } else {
        if (piece.type !== PAWN) {
            moveText += piece.type.charAt(0).toUpperCase();
        }
        if (capturedPiece) {
            if (piece.type === PAWN) {
                moveText += files[startCol];
            }
            moveText += 'x';
        }
        moveText += `${files[endCol]}${ranks[endRow]}`;
    }

    if (promotion) {
        moveText += `=${promotion.charAt(0).toUpperCase()}`;
    }

    if (isInCheck(currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE)) {
        if (isCheckmate(currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE)) {
            moveText += '#';
        } else {
            moveText += '+';
        }
    }

    const moveHistoryBody = document.querySelector('#move-history tbody');
    if (moveHistoryBody) {
        let lastRow = moveHistoryBody.rows[moveHistoryBody.rows.length - 1];
        if (!lastRow || lastRow.cells[2].textContent) {
            lastRow = moveHistoryBody.insertRow();
            lastRow.insertCell(0);
            lastRow.insertCell(1);
            lastRow.insertCell(2);
            lastRow.cells[0].textContent = moveCount++;
        }
        
        if (piece.color === PLAYER_WHITE) {
            lastRow.cells[1].textContent = moveText;
        } else {
            lastRow.cells[2].textContent = moveText;
        }
    }

    moveHistoryBody.scrollTop = moveHistoryBody.scrollHeight;
}

function redoMove() {
    if (redoStack.length === 0) return;

    const move = redoStack.pop();
    const { startRow, startCol, endRow, endCol, promotion } = move;

    const piece = gameBoard[startRow][startCol];
    if (!piece) {
        console.error('No piece found for redo move');
        return;
    }

    // Perform the move
    const redoneMove = movePiece(startRow, startCol, endRow, endCol);
    
    // Handle promotion
    if (promotion) {
        gameBoard[endRow][endCol] = { type: promotion, color: piece.color, hasMoved: true };
    }

    moveStack.push(redoneMove);
    lastMove = redoneMove;

    // Add the move to the history
    addMoveToHistory(redoneMove);

    // Switch player
    currentPlayer = currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;

    renderBoard();
    updateStatus();
    updateAnalysisBar();
    updateUndoRedoButtons();
    updateCapturedPieces();
}

function addMoveToHistory(move) {
    const { piece, startCol, endCol, endRow, capturedPiece, promotion } = move;
    const files = 'abcdefgh';
    const ranks = '87654321';

    let moveText = '';

    if (move.isCastling) {
        moveText = endCol > startCol ? 'O-O' : 'O-O-O';
    } else {
        if (piece.type !== PAWN) {
            moveText += piece.type.charAt(0).toUpperCase();
        }
        if (capturedPiece) {
            if (piece.type === PAWN) {
                moveText += files[startCol];
            }
            moveText += 'x';
        }
        moveText += `${files[endCol]}${ranks[endRow]}`;
    }

    if (promotion) {
        moveText += `=${promotion.charAt(0).toUpperCase()}`;
    }

    if (isInCheck(currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE)) {
        if (isCheckmate(currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE)) {
            moveText += '#';
        } else {
            moveText += '+';
        }
    }

    const moveHistoryBody = document.querySelector('#move-history tbody');
    if (moveHistoryBody) {
        let lastRow = moveHistoryBody.rows[moveHistoryBody.rows.length - 1];
        if (!lastRow || lastRow.cells[2].textContent) {
            lastRow = moveHistoryBody.insertRow();
            lastRow.insertCell(0);
            lastRow.insertCell(1);
            lastRow.insertCell(2);
            lastRow.cells[0].textContent = moveCount++;
        }
        
        if (piece.color === PLAYER_WHITE) {
            lastRow.cells[1].textContent = moveText;
        } else {
            lastRow.cells[2].textContent = moveText;
        }
    }

    moveHistoryBody.scrollTop = moveHistoryBody.scrollHeight;
}

function removeLastMoveFromHistory() {
    const moveHistoryBody = document.querySelector('#move-history tbody');
    if (moveHistoryBody) {
        const lastRow = moveHistoryBody.rows[moveHistoryBody.rows.length - 1];
        if (lastRow) {
            if (lastRow.cells[2].textContent) {
                // If there's a black move, just remove it
                lastRow.cells[2].textContent = '';
            } else {
                // If there's only a white move, remove the entire row
                moveHistoryBody.deleteRow(moveHistoryBody.rows.length - 1);
                moveCount--;
            }
        }
    }
}

function updateUndoRedoButtons() {
    const undoButton = document.getElementById('undo-move');
    const redoButton = document.getElementById('redo-move');

    if (undoButton && redoButton) {
        undoButton.disabled = moveStack.length === 0;
        redoButton.disabled = redoStack.length === 0;
    }
}

// Update move history
function updateMoveHistory(move) {
    const { piece, startCol, endCol, endRow, capturedPiece, promotion } = move;
    const files = 'abcdefgh';
    const ranks = '87654321';

    let moveText = '';

    if (move.isCastling) {
        moveText = endCol > startCol ? 'O-O' : 'O-O-O';
    } else {
        if (piece.type !== PAWN) {
            moveText += piece.type.charAt(0).toUpperCase();
        }
        if (capturedPiece) {
            if (piece.type === PAWN) {
                moveText += files[startCol];
            }
            moveText += 'x';
        }
        moveText += `${files[endCol]}${ranks[endRow]}`;
    }

    if (promotion) {
        moveText += `=${promotion.charAt(0).toUpperCase()}`;
    }

    if (isInCheck(currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE)) {
        if (isCheckmate(currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE)) {
            moveText += '#';
        } else {
            moveText += '+';
        }
    }

    const moveHistoryBody = document.querySelector('#move-history tbody');
    if (moveHistoryBody) {
        let lastRow = moveHistoryBody.rows[moveHistoryBody.rows.length - 1];
        if (!lastRow || lastRow.cells[2].textContent) {
            lastRow = moveHistoryBody.insertRow();
            lastRow.insertCell(0);
            lastRow.insertCell(1);
            lastRow.insertCell(2);
            lastRow.cells[0].textContent = moveCount++;
        }
        
        if (piece.color === PLAYER_WHITE) {
            lastRow.cells[1].textContent = moveText;
        } else {
            lastRow.cells[2].textContent = moveText;
        }
    }

    moveHistoryBody.scrollTop = moveHistoryBody.scrollHeight;
}

// Switch players
function switchPlayer() {
    currentPlayer = currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
    updateStatus();

    isKingInCheck = isInCheck(currentPlayer);

    if (isKingInCheck) {
        if (isCheckmate(currentPlayer)) {
            endGame(getLocalizedString('checkmate', currentPlayer === PLAYER_WHITE ? 'Black' : 'White'));
        } else {
            showNotification(getLocalizedString('check'));
            if (soundEffectsEnabled) {
                SOUND_EFFECTS.check.play();
            }
        }
    } else if (isStalemate(currentPlayer)) {
        endGame(getLocalizedString('stalemate'));
    }
}

// Add this new function to update the board state
function updateBoardState() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const square = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            const piece = gameBoard[row][col];
            
            if (piece) {
                square.classList.add('has-piece');
                square.classList.remove('empty');
            } else {
                square.classList.remove('has-piece');
                square.classList.add('empty');
            }
        }
    }

    if (isKingInCheck) {
        const kingPosition = kingPositions[currentPlayer];
        const kingSquare = board.querySelector(`[data-row="${kingPosition.row}"][data-col="${kingPosition.col}"]`);
        kingSquare.classList.add('in-check');
    }
}

// Update game status
function updateStatus() {
    showNotification(getLocalizedString(currentPlayer === PLAYER_WHITE ? 'whiteTurn' : 'blackTurn'));
}

// Check if a player is in check
function isInCheck(player) {
    const kingPosition = findKing(player);
    if (!kingPosition) return false;

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = gameBoard[row][col];
            if (piece && piece.color !== player) {
                if (isValidMove(row, col, kingPosition.row, kingPosition.col)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function findKing(player) {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = gameBoard[row][col];
            if (piece && piece.type === KING && piece.color === player) {
                return { row, col };
            }
        }
    }
    return null;
}

// Check if a player is in checkmate
function isCheckmate(player) {
    if (!isInCheck(player)) {
        return false;
    }

    return !hasLegalMoves(player);
}

// Check if a player is in stalemate
function isStalemate(player) {
    if (isInCheck(player)) {
        return false;
    }

    return !hasLegalMoves(player);
}

// Check if a player has any legal moves
function hasLegalMoves(player) {
    for (let startRow = 0; startRow < BOARD_SIZE; startRow++) {
        for (let startCol = 0; startCol < BOARD_SIZE; startCol++) {
            const piece = gameBoard[startRow][startCol];
            if (piece && piece.color === player) {
                for (let endRow = 0; endRow < BOARD_SIZE; endRow++) {
                    for (let endCol = 0; endCol < BOARD_SIZE; endCol++) {
                        if (isValidMove(startRow, startCol, endRow, endCol)) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}

// Highlight valid moves for a selected piece
function highlightValidMoves(row, col) {
    clearHighlights();
    selectedPiece.classList.add('selected');

    const piece = gameBoard[row][col];
    let validMoves = [];

    switch (piece.type) {
        case PAWN:
            validMoves = getValidPawnMoves(row, col, piece.color);
            break;
        case ROOK:
            validMoves = getValidRookMoves(row, col);
            break;
        case KNIGHT:
            validMoves = getValidKnightMoves(row, col);
            break;
        case BISHOP:
            validMoves = getValidBishopMoves(row, col);
            break;
        case QUEEN:
            validMoves = getValidQueenMoves(row, col);
            break;
        case KING:
            validMoves = getValidKingMoves(row, col);
            break;
    }

    for (const [moveRow, moveCol] of validMoves) {
        // Check if the move would leave the king in check
        if (!wouldMoveLeaveKingInCheck(row, col, moveRow, moveCol)) {
            const square = board.querySelector(`[data-row="${moveRow}"][data-col="${moveCol}"]`);
            square.classList.add('valid-move');
        }
    }

    // If the king is in check, highlight it
    if (isKingInCheck && piece.type === KING) {
        selectedPiece.classList.add('in-check');
    }
}

function wouldMoveLeaveKingInCheck(startRow, startCol, endRow, endCol) {
    const piece = gameBoard[startRow][startCol];
    const originalEndPiece = gameBoard[endRow][endCol];
    
    // Temporarily make the move
    gameBoard[endRow][endCol] = piece;
    gameBoard[startRow][startCol] = null;
    
    if (piece.type === KING) {
        kingPositions[piece.color] = { row: endRow, col: endCol };
    }
    
    const inCheck = isInCheck(piece.color);
    
    // Undo the move
    gameBoard[startRow][startCol] = piece;
    gameBoard[endRow][endCol] = originalEndPiece;
    
    if (piece.type === KING) {
        kingPositions[piece.color] = { row: startRow, col: startCol };
    }
    
    return inCheck;
}

// Helper functions to get valid moves for each piece type
function getValidPawnMoves(row, col, color) {
    const moves = [];
    const direction = color === PLAYER_WHITE ? -1 : 1;
    const startingRow = color === PLAYER_WHITE ? 6 : 1;

    // Move forward
    if (!gameBoard[row + direction][col]) {
        moves.push([row + direction, col]);
        // Double move from starting position
        if (row === startingRow && !gameBoard[row + 2 * direction][col]) {
            moves.push([row + 2 * direction, col]);
        }
    }

    // Capture diagonally
    for (const colOffset of [-1, 1]) {
        const newCol = col + colOffset;
        if (newCol >= 0 && newCol < 8) {
            if (gameBoard[row + direction][newCol] && gameBoard[row + direction][newCol].color !== color) {
                moves.push([row + direction, newCol]);
            }
            // En passant
            if (row === (color === PLAYER_WHITE ? 3 : 4) && lastMove && 
                lastMove.piece.type === PAWN && 
                lastMove.endRow === row && 
                lastMove.endCol === newCol && 
                Math.abs(lastMove.startRow - lastMove.endRow) === 2) {
                moves.push([row + direction, newCol]);
            }
        }
    }

    return moves;
}

function getValidRookMoves(row, col) {
    return getLinearMoves(row, col, [[0, 1], [0, -1], [1, 0], [-1, 0]]);
}

function getValidKnightMoves(row, col) {
    const moves = [];
    const offsets = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

    for (const [rowOffset, colOffset] of offsets) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            if (!gameBoard[newRow][newCol] || gameBoard[newRow][newCol].color !== gameBoard[row][col].color) {
                moves.push([newRow, newCol]);
            }
        }
    }

    return moves;
}

function getValidBishopMoves(row, col) {
    return getLinearMoves(row, col, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
}

function getValidQueenMoves(row, col) {
    return [...getValidRookMoves(row, col), ...getValidBishopMoves(row, col)];
}

function getValidKingMoves(row, col) {
    const moves = [];
    const offsets = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (const [rowOffset, colOffset] of offsets) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            if (!gameBoard[newRow][newCol] || gameBoard[newRow][newCol].color !== gameBoard[row][col].color) {
                moves.push([newRow, newCol]);
            }
        }
    }

    // Castling
    if (!gameBoard[row][col].hasMoved && !isInCheck(gameBoard[row][col].color)) {
        // Kingside castling
        if (!gameBoard[row][col+1] && !gameBoard[row][col+2] && 
            gameBoard[row][col+3] && gameBoard[row][col+3].type === ROOK && !gameBoard[row][col+3].hasMoved) {
            moves.push([row, col+2]);
        }
        // Queenside castling
        if (!gameBoard[row][col-1] && !gameBoard[row][col-2] && !gameBoard[row][col-3] &&
            gameBoard[row][col-4] && gameBoard[row][col-4].type === ROOK && !gameBoard[row][col-4].hasMoved) {
            moves.push([row, col-2]);
        }
    }

    return moves;
}

function getLinearMoves(row, col, directions) {
    const moves = [];
    const color = gameBoard[row][col].color;

    for (const [rowDir, colDir] of directions) {
        let newRow = row + rowDir;
        let newCol = col + colDir;

        while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            if (!gameBoard[newRow][newCol]) {
                moves.push([newRow, newCol]);
            } else {
                if (gameBoard[newRow][newCol].color !== color) {
                    moves.push([newRow, newCol]);
                }
                break;
            }
            newRow += rowDir;
            newCol += colDir;
        }
    }

    return moves;
}

// Clear highlights from the board
function clearHighlights() {
    const squares = board.getElementsByClassName('square');
    for (let square of squares) {
        square.classList.remove('selected', 'valid-move');
    }
}

// End the game
function endGame(message) {
    showNotification(message);
    gameOver = true;
    clearInterval(timerInterval);
    if (soundEffectsEnabled) {
        SOUND_EFFECTS.gameOver.play();
    }
}

// Reset the game
function resetGame() {
    initializeBoard();
    clearMoveHistory();
    updateStatus();
    clearInterval(timerInterval);
    timerStarted = false;
    startTimerButton.textContent = getLocalizedString('startTimer');
    startTimerButton.disabled = false;
    moveStack = [];
    redoStack = [];
}

// Flip the board
function flipBoard() {
    boardOrientation = boardOrientation === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
    renderBoard();
}

// Start the game timer
function startTimer() {
    if (timerStarted) {
        clearInterval(timerInterval);
        timerStarted = false;
        startTimerButton.textContent = getLocalizedString('startTimer');
    } else {
        timerStarted = true;
        startTimerButton.textContent = getLocalizedString('pauseTimer');
        timerInterval = setInterval(() => {
            timers[currentPlayer]--;
            updateTimerDisplay();
            
            if (timers[currentPlayer] <= 0) {
                clearInterval(timerInterval);
                endGame(getLocalizedString('checkmate', currentPlayer === PLAYER_WHITE ? 'Black' : 'White'));
            }
        }, 1000);
    }
}

// Update timer display
function updateTimerDisplay() {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    whiteTimer.textContent = `${getLocalizedString('whiteTime')} ${formatTime(timers[PLAYER_WHITE])}`;
    blackTimer.textContent = `${getLocalizedString('blackTime')} ${formatTime(timers[PLAYER_BLACK])}`;
}

// Update analysis bar
function updateAnalysisBar() {
    let whiteScore = 0;
    let blackScore = 0;
    const pieceValues = {
        [PAWN]: 1,
        [KNIGHT]: 3,
        [BISHOP]: 3,
        [ROOK]: 5,
        [QUEEN]: 9,
        [KING]: 0
    };

    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const piece = gameBoard[row][col];
            if (piece) {
                const score = pieceValues[piece.type];
                if (piece.color === PLAYER_WHITE) {
                    whiteScore += score;
                } else {
                    blackScore += score;
                }
            }
        }
    }

    const totalScore = whiteScore + blackScore;
    const whitePercentage = (whiteScore / totalScore) * 100;
    analysisProgress.style.width = `${whitePercentage}%`;
}

// Show promotion modal
function showPromotionModal(row, col) {
    pendingPromotion = { row, col };
    promotionModal.style.display = 'flex';
    promotionChoices.innerHTML = '';

    const promotionPieces = [QUEEN, ROOK, BISHOP, KNIGHT];
    for (const pieceType of promotionPieces) {
        const pieceElement = document.createElement('div');
        pieceElement.classList.add('promotion-piece');
        if (currentPieceStyle === 'unicode') {
            pieceElement.textContent = PIECE_UNICODE[currentPlayer][pieceType];
        } else {
            const img = document.createElement('img');
            img.src = PIECE_IMAGES[currentPieceStyle][currentPlayer][pieceType];
            img.alt = `${currentPlayer} ${pieceType}`;
            pieceElement.appendChild(img);
        }
        pieceElement.addEventListener('click', () => handlePromotionChoice(pieceType));
        promotionChoices.appendChild(pieceElement);
    }
}

// Handle promotion choice
function handlePromotionChoice(chosenPiece) {
    const { row, col } = pendingPromotion;
    const promotingColor = (row === 0) ? PLAYER_WHITE : PLAYER_BLACK;
    const promotedPiece = { type: chosenPiece, color: promotingColor, hasMoved: true };
    gameBoard[row][col] = promotedPiece;

    // Update the last move in the moveStack
    if (moveStack.length > 0) {
        const lastMove = moveStack[moveStack.length - 1];
        lastMove.promotion = chosenPiece;
    }

    promotionModal.style.display = 'none';
    pendingPromotion = null;

    renderBoard();
    switchPlayer();
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
}

// Toggle game info panel
function toggleGameInfo() {
    gameInfo.classList.toggle('hidden');
    gameInfoToggle.textContent = gameInfo.classList.contains('hidden') ? '>' : '<';
}

// Localization helper function
function getLocalizedString(key, ...args) {
    let string = i18n[currentLanguage][key] || i18n['en'][key] || key;
    args.forEach((arg, index) => {
        string = string.replace(`{${index}}`, arg);
    });
    return string;
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.title = getLocalizedString('title');
    playButton.textContent = getLocalizedString('play');
    updateStatus();
    newGameButton.textContent = getLocalizedString('newGame');
    undoButton.textContent = getLocalizedString('undoMove');
    redoButton.textContent = getLocalizedString('redoMove');
    flipBoardButton.textContent = getLocalizedString('flipBoard');
    startTimerButton.textContent = getLocalizedString(timerStarted ? 'pauseTimer' : 'startTimer');
    aiMoveButton.textContent = getLocalizedString('aiMove');
    updateTimerDisplay();

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = getLocalizedString(key);
    });
}

// Update particles color
function updateParticlesColor() {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.color.value = primaryColor;
        window.pJSDom[0].pJS.particles.line_linked.color = primaryColor;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// Change piece style
function changePieceStyle(style) {
    currentPieceStyle = style;
    if (document.getElementById('chessboard') && isValidBoard()) {
        renderBoard();
        updateCapturedPieces();
    }
}

// AI move function (simple random move)
function aiMove() {
    if (gameOver || currentPlayer !== PLAYER_BLACK) return;

    // Show a loading indicator or change the AI button state
    const aiButton = document.getElementById('ai-move');
    aiButton.textContent = 'AI Thinking...';
    aiButton.disabled = true;

    // Delay the AI move
    setTimeout(() => {
        const validMoves = [];
        for (let startRow = 0; startRow < BOARD_SIZE; startRow++) {
            for (let startCol = 0; startCol < BOARD_SIZE; startCol++) {
                const piece = gameBoard[startRow][startCol];
                if (piece && piece.color === PLAYER_BLACK) {
                    for (let endRow = 0; endRow < BOARD_SIZE; endRow++) {
                        for (let endCol = 0; endCol < BOARD_SIZE; endCol++) {
                            if (isValidMove(startRow, startCol, endRow, endCol)) {
                                validMoves.push({ startRow, startCol, endRow, endCol });
                            }
                        }
                    }
                }
            }
        }

        if (validMoves.length > 0) {
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            const { startRow, startCol, endRow, endCol } = randomMove;
            const move = movePiece(startRow, startCol, endRow, endCol);
            
            // Handle pawn promotion for AI
            if (move.piece.type === PAWN && endRow === 0) {
                const promotionPieces = [QUEEN, ROOK, BISHOP, KNIGHT];
                const randomPromotion = promotionPieces[Math.floor(Math.random() * promotionPieces.length)];
                gameBoard[endRow][endCol] = { type: randomPromotion, color: PLAYER_BLACK, hasMoved: true };
                move.promotion = randomPromotion;
            }
            
            // Update move history directly here instead of in movePiece
            updateMoveHistory(move);
            
            // Switch player after the move
            switchPlayer();
            
            // Update UI
            renderBoard();
            updateAnalysisBar();
            updateUndoRedoButtons();
        }

        // Reset the AI button
        aiButton.textContent = 'AI Move';
        aiButton.disabled = false;

    }, 1500); // 1000 milliseconds = 1 second delay
}

// Update captured pieces display
function updateCapturedPieces() {
    const whiteCapturedList = document.querySelector('#white-captured .captured-pieces-list');
    const blackCapturedList = document.querySelector('#black-captured .captured-pieces-list');
    
    whiteCapturedList.innerHTML = '';
    blackCapturedList.innerHTML = '';

    const createPieceElement = (piece, color) => {
        const pieceElement = document.createElement('span');
        pieceElement.classList.add('captured-piece');
        if (currentPieceStyle === 'unicode') {
            pieceElement.textContent = PIECE_UNICODE[color][piece.type];
        } else {
            const img = document.createElement('img');
            img.src = PIECE_IMAGES[currentPieceStyle][color][piece.type];
            img.alt = `${color} ${piece.type}`;
            pieceElement.appendChild(img);
        }
        return pieceElement;
    };

    capturedPieces[PLAYER_WHITE].forEach(piece => {
        whiteCapturedList.appendChild(createPieceElement(piece, PLAYER_BLACK));
    });

    capturedPieces[PLAYER_BLACK].forEach(piece => {
        blackCapturedList.appendChild(createPieceElement(piece, PLAYER_WHITE));
    });
}

// Event listeners
playButton.addEventListener('click', () => {
    landingPage.style.display = 'none';
    gameContainer.style.display = 'flex';
    document.querySelector('.navbar').style.display = 'flex';
    initializeBoard();
    notification.style.display = 'block'; // Show notification permanently after clicking play
});

newGameButton.addEventListener('click', resetGame);
undoButton.addEventListener('click', undoMove);
redoButton.addEventListener('click', redoMove);
flipBoardButton.addEventListener('click', flipBoard);
startTimerButton.addEventListener('click', startTimer);
gameInfoToggle.addEventListener('click', toggleGameInfo);
toggleInfoButton.addEventListener('click', toggleGameInfo);
aiMoveButton.addEventListener('click', aiMove);

document.querySelectorAll('.dropdown-item[data-lang]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        changeLanguage(e.target.dataset.lang);
    });
});

document.querySelectorAll('.dropdown-item[data-scheme]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        changeColorScheme(e.target.dataset.scheme);
    });
});

document.querySelectorAll('.dropdown-item[data-style]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        changePieceStyle(e.target.dataset.style);
    });
});

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

closeSettingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

showLabelsCheckbox.addEventListener('change', () => {
    renderBoard();
});

boardSizeSlider.addEventListener('input', (e) => {
    const size = e.target.value;
    document.documentElement.style.setProperty('--board-size', `${size}vmin`);
    renderBoard();
});

decreaseSizeButton.addEventListener('click', () => {
    boardSizeSlider.value = Math.max(parseInt(boardSizeSlider.value) - 5, boardSizeSlider.min);
    boardSizeSlider.dispatchEvent(new Event('input'));
});

increaseSizeButton.addEventListener('click', () => {
    boardSizeSlider.value = Math.min(parseInt(boardSizeSlider.value) + 5, boardSizeSlider.max);
    boardSizeSlider.dispatchEvent(new Event('input'));
});

animationSpeedSlider.addEventListener('input', (e) => {
    animationSpeed = parseFloat(e.target.value);
});

soundEffectsCheckbox.addEventListener('change', (e) => {
    soundEffectsEnabled = e.target.checked;
});

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 }, image: { src: 'img/github.svg', width: 100, height: 100 } },
        opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
});

// Add landing page transition
window.addEventListener('load', () => {
    document.querySelectorAll('.landing-page-transition').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('show');
        }, index * 200);
    });
});

// Save settings to localStorage
function saveSettings() {
    const settings = {
        language: currentLanguage,
        colorScheme: document.documentElement.style.getPropertyValue('--primary-color'),
        showLabels: showLabelsCheckbox.checked,
        boardSize: boardSizeSlider.value,
        pieceStyle: currentPieceStyle,
        animationSpeed: animationSpeed,
        soundEffects: soundEffectsEnabled
    };
    localStorage.setItem('chessSettings', JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('chessSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        changeLanguage(settings.language);
        changeColorScheme(settings.colorScheme);
        showLabelsCheckbox.checked = settings.showLabels;
        boardSizeSlider.value = settings.boardSize;
        boardSizeSlider.dispatchEvent(new Event('input'));
        changePieceStyle(settings.pieceStyle);
        animationSpeed = settings.animationSpeed;
        animationSpeedSlider.value = settings.animationSpeed;
        soundEffectsEnabled = settings.soundEffects;
        soundEffectsCheckbox.checked = settings.soundEffects;
    }
    
    // Always initialize the board, regardless of saved settings
    initializeBoard();
}

// Save settings when changed
document.querySelectorAll('.dropdown-item[data-lang], .dropdown-item[data-scheme], .dropdown-item[data-style]').forEach(item => {
    item.addEventListener('click', saveSettings);
});
showLabelsCheckbox.addEventListener('change', saveSettings);
boardSizeSlider.addEventListener('change', saveSettings);
animationSpeedSlider.addEventListener('change', saveSettings);
soundEffectsCheckbox.addEventListener('change', saveSettings);

// Load settings on page load
loadSettings();

// Idle animation for landing page
function startIdleAnimation() {
    const logo = document.getElementById('game-logo');
    logo.style.animation = 'float 3s ease-in-out infinite';
}

// Start idle animation after a delay
setTimeout(startIdleAnimation, 2000);

// Initialize the game
initializeBoard();

document.addEventListener('DOMContentLoaded', function() {
    initializeBoard(); // This will also call renderBoard if the board is valid
    loadSettings();
});